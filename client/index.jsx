import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Note from './components/Note';
import Notes from './components/Notes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/notes" element={<Notes />} />  */}
        <Route path="/notes/:id" element={<Note />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
