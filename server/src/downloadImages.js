import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { pool } from "./database.js";

dotenv.config();

const imagesDir = path.join(process.cwd(), "..", "public", "images");

async function downloadImages() {
  try {
    await fs.mkdir(imagesDir, { recursive: true });

    const result = await pool.query(
      "SELECT id, image FROM recipes ORDER BY id",
    );

    console.log(`Found ${result.rows.length} recipes`);

    for (const recipe of result.rows) {
      const imageUrl = recipe.image;

      if (!imageUrl) {
        console.log(`Recipe ${recipe.id}: image URL not found`);
        continue;
      }

      const extension = path.extname(new URL(imageUrl).pathname) || ".webp";
      const fileName = `${recipe.id}${extension}`;
      const filePath = path.join(imagesDir, fileName);

      try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        await fs.writeFile(filePath, buffer);

        const localImagePath = `/images/${fileName}`;

        await pool.query("UPDATE recipes SET image = $1 WHERE id = $2", [
          localImagePath,
          recipe.id,
        ]);

        console.log(`Recipe ${recipe.id}: downloaded`);
      } catch (error) {
        console.error(`Recipe ${recipe.id}: failed - ${error.message}`);
      }
    }

    console.log("Image download completed");
  } catch (error) {
    console.error("Image download failed:", error.message);
  } finally {
    await pool.end();
  }
}

downloadImages();
