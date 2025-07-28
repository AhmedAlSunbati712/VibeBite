import React, { useState } from 'react';
import axios from 'axios';

function SaveButton() {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPlaylistName('');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://vibebite.onrender.com/savePlaylist',
        {
          name: playlistName,
          description: description
        },
        {
          withCredentials: true
        }
      );
      alert('Playlist saved!');
      handleCloseModal();
    } catch (err) {
      console.error('Failed to save playlist', err);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        style={{
          backgroundColor: '#1DB954',
          color: 'white',
          padding: '0.75rem 2rem',
          fontSize: '1.2rem',
          border: 'none',
          borderRadius: '8px',
          marginTop: '1rem',
          cursor: 'pointer'
        }}
      >
        Save Playlist
      </button>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={{ marginBottom: '1rem' }}>Save Playlist</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Playlist Name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                required
                style={styles.input}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...styles.input, height: '80px' }}
              />
              <div style={{ marginTop: '1rem' }}>
                <button type="submit" style={styles.submitButton}>Submit</button>
                <button onClick={handleCloseModal} type="button" style={styles.cancelButton}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    maxWidth: '400px',
    width: '90%'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  submitButton: {
    backgroundColor: '#1DB954',
    color: 'white',
    padding: '0.5rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '1rem'
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#333',
    padding: '0.5rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default SaveButton;
