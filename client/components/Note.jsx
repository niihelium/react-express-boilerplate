import React, { useEffect, useState } from 'react';
import { getNoteById } from '../api';
import { useParams } from 'react-router-dom';

const Note = () => {
  const { id } = useParams(); // Get note ID from URL
  const [note, setNote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await getNoteById(id);
        setNote(data);
      } catch (err) {
        setError('Note not found or you are not authorized to view it.');
      }
    };

    fetchNote();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return note ? (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Note;
