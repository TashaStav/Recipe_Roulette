let recipes = [
  {
    id: 1,
    name: 'Pasta Carbonara',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 'Easy',
    cuisine: 'Italian',
  },
  {
    id: 2,
    name: 'Chicken Curry',
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'Medium',
    cuisine: 'Indian',
  },
];

export const recipesService = {
  findAll() {
    return recipes;
  },

  findById(id) {
    return recipes.find((recipe) => recipe.id === id);
  },
};