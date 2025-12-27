import { useEffect, useState } from "react";
import api from "../api/axios";
import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    await api.post("/notes", { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <form onSubmit={addNote} className="bg-white p-4 rounded shadow mb-6">
        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="mt-2 bg-black text-white px-4 py-2 rounded">
          Add Note
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
}
