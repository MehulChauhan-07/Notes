import Note from "../models/Note.js";

export const createNote = async (req, res) => {

    const noteExists = await Note.findOne({ title: req.body.title, user: req.userId });
    if (noteExists) {
        return res.status(400).json({ message: "Note with this title already exists" });
    };
    const note = await Note.create({
        title: req.body.title,
        content: req.body.content,
        user: req.userId
    });

    res.status(201).json(note);
};

export const getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
};

export const getNotesById = async (req, res) => {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
};


export const updateNote = async (req, res) => {
    // Check if another note with the same title exists for this user
    // example of api /notes/:id to update note with id
    const existingNote = await Note.findOne({ title: req.body.title, user: req.userId, _id: { $ne: req.params.id } });
    if (existingNote) {
        return res.status(400).json({ message: "Another note with this title already exists" });
    }
    // explain how can i change only title or content or both using id with json body style 
    // for example to change only title i can send { "title": "new title" } in body
    
    const note = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        req.body,
        { new: true }
    );

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
};

export const deleteNote = async (req, res) => {
    const note = await Note.findOneAndDelete({
        _id: req.params.id,
        user: req.userId
    });

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
};
