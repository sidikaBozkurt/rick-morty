import React from 'react';
import { Link } from 'react-router-dom';

export default function CharacterCard({ character }) {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', width: '180px', textAlign: 'center' }}>
            <img
                src={character.image}
                alt={character.name}
                style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3>{character.name}</h3>
            <Link to={`/character/${character.id}`}>Detayları Gör</Link>
        </div>
    );
}
