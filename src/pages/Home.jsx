import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';

export default function Home() {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['characters'],
        queryFn: ({ pageParam = 1 }) => getCharacters({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.info.next) {
                const nextPage = new URL(lastPage.info.next).searchParams.get('page');
                return Number(nextPage);
            }
            return undefined;
        },
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const bottomPosition = document.documentElement.offsetHeight;

            // 500px kala yeni verileri çekmeye başlar
            if (scrollPosition >= bottomPosition - 500 && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Karakterler hazırlanıyor...</p>;

    if (isError && !data) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Veri alınamadı. Lütfen internetini kontrol et.</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Rick and Morty Dünyası</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1.5rem'
            }}>
                {data.pages.flatMap((page) =>
                    page.results.map((character) => (
                        <CharacterCard key={character.id} character={character} />
                    ))
                )}
            </div>

            <div style={{ textAlign: 'center', margin: '40px 0' }}>
                {isFetchingNextPage && <p>📦 Yeni karakterler portalden geçiyor...</p>}

                {isError && (
                    <div style={{ color: 'red', border: '1px solid red', padding: '15px', borderRadius: '8px' }}>
                        <p>Bağlantı kesildi, tekrar deneniyor...</p>
                        <button onClick={() => fetchNextPage()}>Şimdi Yeniden Dene</button>
                    </div>
                )}

                <p style={{ fontWeight: 'bold' }}>
                    Toplam {data?.pages?.flatMap(page => page.results).length || 0} karakter listelendi.
                </p>
            </div>
        </div>
    );
}