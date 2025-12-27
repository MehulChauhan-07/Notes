export default function NoteCard({ note, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold">{note.title}</h3>
      <p className="text-sm mt-2">{note.content}</p>
      <button
        onClick={() => onDelete(note._id)}
        className="text-red-600 mt-2 text-sm"
      >
        Delete
      </button>
    </div>
  );
}
