import { Genius } from 'genius-lyrics-api';

const API_KEY = 'EV9EwqZNI62ptrEm8OUSToCQRv2_UKKnSHclwzFOd0KORO_0Vo74Ib71oHQPqtSN'; 

// Create a Genius instance with your API key
const genius = new Genius(API_KEY);

async function getLyrics(songTitle: string, artistName: string): Promise<string | null> {
  try {
    // Search for the song using Genius API
    const song = await genius.search(songTitle, artistName);

    if (song && song.lyrics) {
      return song.lyrics;
    } else {
      console.error('Lyrics not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
}

export default getLyrics;
