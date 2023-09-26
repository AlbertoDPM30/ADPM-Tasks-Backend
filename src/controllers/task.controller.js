import Task from "../models/tasks.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ Error: "Algo salió mal obteniendo con la peticion getTasks" });
  }
};

export const createTask = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res
      .status(500)
      .json({ Error: "Algo salió mal con la petición createTask" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ Mensaje: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    return res
      .status(500)
      .json({ Error: "Algo salió mal con la petición getTask" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ Mensaje: "Tarea no encontrada" });
    res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .json({ Error: "Algo salió mal con la petición deleteTask" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ Mensaje: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ Error: "Algo salió mal con la petición updateTask" });
  }
};
