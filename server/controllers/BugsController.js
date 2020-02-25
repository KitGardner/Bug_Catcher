import express from "express";
import bugsService from "../services/BugsService";

export default class BugsController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:bugId/notes", this.getNotesByBugId)
      .post("", this.createBug)
      .put("/:id", this.editBug)
      .put("/:bugId/notes/:noteId", this.updateBugNote)
      .delete("/:id", this.closeBug);
  }

  async getAll(req, res, next) {
    try {
      let data = await bugsService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let bug = await bugsService.getById(req.params.id);
      res.send(bug);
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      let notes = await bugsService.getNotesByBugId(req.params.bugId);
      res.send(notes);
    } catch (error) {
      next(error);
    }
  }

  async createBug(req, res, next) {
    try {
      let data = await bugsService.createBug(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async editBug(req, res, next) {
    try {
      let editedBug = await bugsService.editBug(req.params.id, req.body);
      res.send(editedBug);
    } catch (error) {
      next(error);
    }
  }

  async updateBugNote(req, res, next) {
    try {
      let updateResult = await bugsService.updateBugNote(req.params.bugId, req.params.noteId, req.body);
      res.send(updateResult);
    } catch (error) {
      next(error);
    }
  }

  async closeBug(req, res, next) {
    try {
      let result = await bugsService.closeBug(req.params.id);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}
