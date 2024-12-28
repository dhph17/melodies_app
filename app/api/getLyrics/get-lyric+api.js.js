import { PUBLIC_API_LYRIC } from '@/app/config'
const GENIUS_BASE_URL = 'https://api.genius.com';

export const fetchLyrics = async (artist, title) => {
    if (!artist || !title) {
        throw new Error('Artist and title are required');
    }

    try {
        // Search for the song
        const searchQuery = encodeURIComponent(`${artist} ${title}`);
        const searchResponse = await fetch(
            `${GENIUS_BASE_URL}/search?q=${searchQuery}`,
            {
                headers: {
                    'Authorization': `Bearer ${PUBLIC_API_LYRIC}`,
                },
            }
        );

        const searchData = await searchResponse.json();

        if (!searchData.response.hits.length) {
            throw new Error('Song not found');
        }

        // Get the song URL and path
        const songUrl = searchData.response.hits[0].result.url;
        const songPath = searchData.response.hits[0].result.path;

        // Get song details
        const songResponse = await fetch(
            `${GENIUS_BASE_URL}${songPath}`,
            {
                headers: {
                    'Authorization': `Bearer ${GENIUS_API_KEY}`,
                },
            }
        );

        const songData = await songResponse.json();

        if (!songData.response.song) {
            throw new Error('Song details not found');
        }

        return {
            title: songData.response.song.title,
            artist: songData.response.song.primary_artist.name,
            lyrics_url: songUrl,
            album_art: songData.response.song.song_art_image_url,
            release_date: songData.response.song.release_date,
        };
    } catch (error) {
        console.error('Error fetching song data:', error);
        throw error;
    }
};