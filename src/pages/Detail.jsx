import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCharacterById } from '../services/api';

export default function Detail() {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['character', id],
        queryFn: () => getCharacterById(id),
    });

    if (isLoading) return <p>Yükleniyor...</p>;
    if (isError) return <p>Hata oluştu. Lütfen tekrar deneyin.</p>;

    return (
        <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <ion-icon name="arrow-undo-sharp" style={{ fontSize: '24px', marginRight: '0.5rem' }} />
                Geri Dön
            </Link>

            <h2>{data.name}</h2>
            <img src={data.image} alt={data.name} />
            <p><strong>Tür:</strong> {data.species}</p>
            <p><strong>Durum:</strong> {data.status}</p>
            <p><strong>Konum:</strong> {data.location.name}</p>
        </div>
    );
}
