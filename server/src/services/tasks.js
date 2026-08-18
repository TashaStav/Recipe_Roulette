let tasks = [
  {
    id: 1,
    title: "Приготовить салат",
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: 2,
    title: "Запечь мясо",
    completed: true,
    createdAt: Date.now(),
  },
];

let nextId = 3;

export const tasksService = {
findAll(page, limit, completed) {
  let result = [...tasks];

  if (completed !== undefined) {
    result = result.filter(
      (task) => task.completed === (completed === "true")
    );
  }

  if (page && limit) {
    const start = (page - 1) * limit;
    const end = start + limit;

    result = result.slice(start, end);
  }
  return result;
  },

  findById(id) {
    return tasks.find((task) => task.id === id);
  },

  create(data) {
    const task = {
      id: nextId++,
      title: data.title,
      completed: false,
      createdAt: Date.now(),
    };

    tasks.push(task);
    return task;
  },

  update(id, data) {
    const task = this.findById(id);

    if (!task) {
      return null;
    }

    if (data.title !== undefined) {
      task.title = data.title;
    }

    if (data.completed !== undefined) {
      task.completed = data.completed;
    }
    return task;
  },

  delete(id) {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    tasks.splice(index, 1);
    return true;
  },
};