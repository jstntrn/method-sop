create table users (
    id serial primary key,
    username varchar(20) not null unique,
    password varchar(200) not null,
    email varchar
);

create table videos (
    id serial primary key,
    user_id integer,
    foreign key(user_id) references users(id),
    video_url varchar,
    thumbnail varchar
);

create table projects (
    id serial primary key,
    video_id integer,
    foreign key(video_id) references videos(id),
    user_id integer,
    foreign key(user_id) references users(id),
    title varchar(50),
    image_url varchar
);

create table slides (
    id serial primary key,
    project_id integer,
    foreign key(project_id) references projects(id),
    pause_time float,
    title varchar
);

create table content_cards (
    id serial primary key,
    slide_id integer,
    foreign key(slide_id) references slides(id),
    type varchar,
    title varchar,
    content varchar
);