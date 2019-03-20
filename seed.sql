DROP DATABASE IF EXISTS mygramapp;
CREATE DATABASE mygramapp;

\c mygramapp;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    avatar VARCHAR UNIQUE NOT NULL,
    createdat TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    userid INT REFERENCES users(id) NOT NULL,
    imgurl VARCHAR UNIQUE NOT NULL,
    caption VARCHAR UNIQUE NOT NULL,
    numofcomments INT,
    numoflikes INT
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    userid INT REFERENCES users(id) NOT NULL,
    postid INT REFERENCES post(id) NOT NULL,
    text VARCHAR UNIQUE NOT NULL
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    personlikedid INT REFERENCES users (id) NOT NULL,
    postid INT REFERENCES post(id) NOT NULL
);

CREATE TABLE followers (
    id SERIAL PRIMARY KEY,
    personfollowingid INT REFERENCES users (id) NOT NULL,
    personbeingfollowedid INT REFERENCES post(id) NOT NULL
);