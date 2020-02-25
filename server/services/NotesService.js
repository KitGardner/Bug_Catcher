import mongoose from "mongoose";
import note from "../models/Note";
import { NotFound, BadRequest, Unexpected } from "../errors";

const _repository = mongoose.model("note", note);

class NotesService {
  async getAll() {
    return await _repository.find({});
  }
  async createNote(noteData) {
    return await _repository.create(noteData)
  }
  async deleteNote(id) {
    let deleteResult = await _repository.findByIdAndRemove(id);
    return deleteResult;
  }
}

let notesService = new NotesService();
export default notesService;