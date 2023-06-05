CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id)
    ON DELETE CASCADE,
    created_on TIMESTAMPTZ DEFAULT current_timestamp,
    songs TEXT[]
);