import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';

export default function Home() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['characters'],
        queryFn: getCharacters,
    });

    if (isLoading) return <p>Yükleniyor...</p>;
    if (isError) return <p>Veri alınamadı. Lütfen tekrar deneyin.</p>;

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                Rick and Morty Karakterleri
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {data.results.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        </div>
    );
}

