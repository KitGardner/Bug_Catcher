import express from "express";
import bugsService from "../services/BugsService";
import notesService from "../services/NotesService";

export default class NotesController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll)
      .post("", this.createNote)
      .delete("/:id", this.deleteNote);
  }

  async getAll(req, res, next) {
    try {
      let notes = await notesService.getAll();
      res.send(notes);
    } catch (error) {
      next(error);
    }
  }

  async createNote(req, res, next) {
    try {
      let newNote = await notesService.createNote(req.body);
      res.send(newNote);
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req, res, next) {
    try {
      let result = await notesService.deleteNote(req.params.id);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}