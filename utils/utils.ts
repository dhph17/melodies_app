import { Artist, DataAlbum } from '@/types/interfaces';
import ImageSong from '@/assets/images/placeholderSong.png'
import ImagePlaylist from '@/assets/images/placeholderPlaylist.png'

// Hàm lấy tên nghệ sĩ chính
export const getMainArtistInfo = (artists: Artist[]): { name?: string; id?: string } | undefined => {
    const mainArtist = artists.find(artist => artist?.ArtistSong.main === true);
    if (!mainArtist) return undefined;
    return {
        name: mainArtist.name,
        id: mainArtist.id,
    };
};

export const getSubArtistsInfo = (artists: Artist[]): { name?: string; id?: string }[] => {
    return artists
        .filter(artist => artist?.ArtistSong.main !== true)
        .map(artist => ({ name: artist.name, id: artist.id }))
        .filter(subArtist => subArtist.name && subArtist.id);
};

export const getAllArtistsInfo = (artists: Artist[]): { name?: string; id?: string }[] => {
    const mainArtist = getMainArtistInfo(artists);
    const subArtists = getSubArtistsInfo(artists);

    return mainArtist ? [mainArtist, ...subArtists] : subArtists;
};

export const getPosterSong = (albums: Array<DataAlbum>, albumType?: string) => {
    if (albums?.length) {
        const filteredAlbums = albumType
            ? albums.filter(album => album.albumType === albumType)
            : albums;

        for (const album of albums) {
            if (Array.isArray(album.albumImages)) {
                const foundImage = album.albumImages.find(img => img.size === 300)?.image;
                if (foundImage) {
                    return { title: album.title, image: foundImage };
                }
            }
        }

        const fallbackAlbum = filteredAlbums[0];
        return {
            title: fallbackAlbum?.title || "Unknown Title",
            image: fallbackAlbum?.albumImages?.[0]?.image || require('../assets/images/placeholderPlaylist.png'),
        };
    }

    return { title: "Unknown Title", image: require('../assets/images/placeholderPlaylist.png') };
};

// Hàm lấy poster của album
export const getPoster = (album: DataAlbum): string => {
    if (album?.albumImages && album.albumImages.length > 0) {
        const foundImage = album.albumImages.find(img => img.size === 300)?.image;
        return foundImage || album.albumImages[0].image;
    } else {
        return require('@/assets/images/placeholderPlaylist.png')
    }
};

//Format time
export function formatTime(createdAt: string): string {
    const standardizedDate = createdAt.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2');
    const now = new Date();
    const createdDate = new Date(standardizedDate);

    if (isNaN(createdDate.getTime())) {
        return 'Invalid Time';
    }

    const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} giây trước`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} tiếng trước`;
    } else {
        return createdDate.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
}

export const formatTimeDuration = (duration: number) => {
    const min = Math.floor(duration / 1000 / 60);
    const sec = Math.floor((duration / 1000) % 60);

    const formattedSec = sec < 10 ? "0" + sec : sec;

    return min + ":" + formattedSec;
};