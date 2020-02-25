import mongoose from "mongoose";
import bug from "../models/Bug";
import { NotFound, BadRequest, Unexpected } from "../errors";
import note from "../models/Note";

const _repository = mongoose.model("bug", bug);
const _noteRepository = mongoose.model("note", note);

class BugsService {

  async getNotesByBugId(bugId) {
    return await _noteRepository.find({ bug: bugId });
  }
  async getAll() {
    return await _repository.find({});
  }
  async getById(id) {
    return await _repository.findById(id);
  }
  async createBug(bugData) {
    return await _repository.create(bugData);
  }
  async editBug(id, editData) {
    let existingBug = await _repository.findById(id);
    if (!existingBug) {
      throw new NotFound("There is no bug with the id of " + id);
    }

    if (existingBug.closed) {
      throw new BadRequest("That bug cannot be edited as it has been closed");
    }

    if (!editData) {
      throw new BadRequest("Please provide valid bug data to update with");
    }

    return await _repository.findByIdAndUpdate(id, editData, { new: true });
  }

  async updateBugNote(bugId, noteId, noteData) {
    let bug = _repository.findById(bugId);

    if (!bug) {
      throw new BadRequest("No bug exists with the id " + bugId);
    }

    if (bug.closed) {
      throw new BadRequest("No notes can be updated for closed bugs");
    }


    return await _noteRepository.findByIdAndUpdate(noteId, noteData, { new: true })
  }

  async closeBug(id) {
    let existingBug = await _repository.findById(id);

    if (!existingBug) {
      throw new BadRequest("No bug found with id " + id);
    }

    if (existingBug.closed) {
      throw new BadRequest("This bug has already been closed");
    }

    let deleteResult = await _repository.findByIdAndUpdate(id, { closed: true }, { new: true });
    if (!deleteResult.closed) {
      throw new Unexpected("An error occurred while closing the bug");
    }

    return "Bug was successfully closed";
  }
}

const bugsService = new BugsService();
export default bugsService;
