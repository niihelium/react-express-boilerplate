import React, { useState, useEffect } from 'react';
import { getNotes, createNote } from '../api';
import { Link } from 'react-router-dom';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const fetchNotes = async () => {
        try {
            const { data } = await getNotes();
            setNotes(data);
        } catch (err) {
            console.error('Error fetching notes:', err);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await createNote(title, content);
            setTitle('');
            setContent('');
            fetchNotes();  // Refresh notes after adding
        } catch (err) {
            console.error('Error creating note:', err);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div>
            <h2>Notes</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                />
                <button type="submit">Add Note</button>
            </form>

            <ul>
                {notes.map(note => (
                    <li key={note._id}>
                        <h3>
                            <Link to={`/notes/${note._id}`}>{note.title}</Link>
                        </h3>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
