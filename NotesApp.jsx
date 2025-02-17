import { useEffect, useState } from 'react';

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetch('https://notes-app-nkpu.onrender.com')
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  // Add a new note
  const addNote = async () => {
    const response = await fetch('https://notes-app-nkpu.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newNote }),
    });
    const newNoteData = await response.json();
    setNotes([...notes, newNoteData]); 
    setNewNote(''); 
  };

  return (
    <div>
      <h1>Notes App</h1>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.content}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button onClick={addNote}>Add Note</button>
    </div>
  );
}

export default NotesApp;
