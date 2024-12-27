import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase({ name: "songs.db", location: "default" });

export const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        artist TEXT,
        url TEXT
      );`
    );
  });
};

export const getOfflineSongs = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM songs;",
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });

export const addOfflineSong = (name, artist, url) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO songs (name, artist, url) VALUES (?, ?, ?);",
        [name, artist, url],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
