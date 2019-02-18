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

alter table videos
add column title varchar;

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

{project_id:1, title: 'Door Assembly', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiT1rBCqDIOhVwHzQUYKnBgAyZV9zBlp5MpPAaGY0zC9JThF4Z'},
{project_id:2, title: 'Suspension Install', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOC1ECpbdbkTsDg2MDXRQz0cpOGsbgMDOtAMA6Zbp_Q3Y6R0AY8A'},
{project_id:3, title: 'Engine Assembly', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJQ8QV_XI5POuJI2mXtWnJRHRd-orrsh9lBQPl9WE2A2AEI-ZD'}     