CREATE TABLE join_table (
	id serial PRIMARY KEY UNIQUE,
	user_id INT NOT NULL,
    movie_id INT NOT NULL,
    group_name VARCHAR(50) NOT NULL
);

CREATE TABLE group_table (
	id serial PRIMARY KEY UNIQUE,
    group_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_table (
	id serial PRIMARY KEY UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE movie_opinion_table (
	id serial PRIMARY KEY UNIQUE,
    user_id INT NOT NULL,
    movie_name VARCHAR(50) NOT NULL,
    star_rating TINYINT NOT NULL, 
    genre VARCHAR(50) NOT NULL
);

ALTER TABLE movie_opinion_table ADD CONSTRAINT FK_PersonOrder FOREIGN KEY (user_id) REFERENCES join_table(user_id);
CONSTRAINT fk_own_user FOREIGN KEY (ownerId) REFERENCES user_tbl(id),