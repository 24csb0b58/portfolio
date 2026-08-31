import { Router } from "express";
import projects from "../data/projects.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(projects);
});

router.get("/:id", (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.status(200).json(project);
});

export default router;