//album
export interface AlbumImage {
    image: string;
    size: number;
}

export interface DataAlbum {
    albumId: string;
    title: string;
    albumImages: Array<AlbumImage>;
    releaseDate: string;
    totalDuration: number;
    songNumber: number;
    albumType: string;
    songs: Array<DataSong>
    artistMain: Artist;
    albumAnother: Array<DataAlbum>
}

//artist
export interface ArtistSong {
    main: boolean;
}

export interface Artist {
    id: string;
    name: string;
    ArtistSong: ArtistSong;
    avatar: string;
    totalSong: number;
    totalFollow: number;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
    popSong: Array<DataSong>
}

//song
export interface DataSong {
    id: string;
    title: string;
    duration: number;
    lyric: string;
    filePathAudio: string;
    isLocal?: boolean;
    privacy: boolean;
    uploadUserId: string | null;
    releaseDate: string;
    viewCount: number | null;
    createdAt: string;
    album: Array<DataAlbum>;
    artists: Array<Artist>;
    playCount: string;
    image: string;
}

//user
export interface User {
    id: string;
    username: string;
    image: string | null;
    accountType: string;
    name: string;
    email: string
}

//comment
export interface Comment {
    id: string;
    commentParentId: string | null;
    userId: string;
    content: string;
    createdAt: string;
    user: User;
    hasChild: number;
    myComment: boolean;
    songId: string;
}

//playlist

export interface PlaylistImage {
    image: string;
    size: number;
}

export interface DataPlaylist {
    username: string;
    playlistId: string;
    title: string;
    name: string;
    image: string;
    description: string;
    totalTime: number;
    totalSong: number;
    createdAt: string;
    songsOfPlaylist: DataSong[];
    privacy: boolean;
}

// socket
export interface DataCurrentSong {
    song: DataSong,
    isPlaying: boolean,
    currentTime: number,
}

// genre

export interface GenreData {
    genreId: string;
    name: string;
}


export interface UserRoom {
    id: string;
    username: string;
    image: string | null;
    accountType: string;
    name: string;
    host: boolean
}


export interface Message {
    user: UserRoom,
    message: string,
    userSend: string
}

//notification
export interface Notification {
    id: string;
    userId: string;
    type: string;
    message: string;
    isRead: boolean;
    from: string;
    createdAt: string;
    updatedAt: string;
    report: Report
}

//report
export interface Report {
    id: string;
    content: string;
    userId: string;
    status: string;
    createdAt: string;
    comment: Comment;
}


export interface UserPayment {
    id: string;
    username: string;
    name: string;
    email: string;
    image: string;
    status: string;
    createdAt: string;
}

export interface Package {
    id: string;
    time: string;
    fare: number;
    description: string;
    downloads: number;
    uploads: number;
    room: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Payment {
    id: string;
    startDate: string;
    endDate: string;
    status: string;
    statusUse: boolean;
    createdAt: string;
    updatedAt: string;
    user: UserPayment;
    package: Package;
}
