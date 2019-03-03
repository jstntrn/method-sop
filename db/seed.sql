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
    channel_id integer
    foreign key(channel_id) references channels(id),
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
    content varchar,
    url varchar
);

create table channels (
    id serial primary key,
    name varchar(100),
    owner_id integer,
    foreign key(owner_id) references users(id)
);

create table access (
    id serial primary key,
    owner_id integer,
    user_email varchar
)

create table permissions (
    id serial primary key,
    email varchar,
    foreign key(email) references access(user_email),
    channel_id integer,
    foreign key(channel_id) references channels(id),
    view boolean,
    edit boolean
);

create table progression (
    id serial primary key,
    user_id integer,
    foreign key(user_id) references users(id),
    project_id integer,
    foreign key(project_id) references projects(id),
    completed boolean
);

alter table projects
add column channel_id integer references channels(id);

{project_id:1, title: 'Door Assembly', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiT1rBCqDIOhVwHzQUYKnBgAyZV9zBlp5MpPAaGY0zC9JThF4Z'},
{project_id:2, title: 'Suspension Install', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOC1ECpbdbkTsDg2MDXRQz0cpOGsbgMDOtAMA6Zbp_Q3Y6R0AY8A'},
{project_id:3, title: 'Engine Assembly', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJQ8QV_XI5POuJI2mXtWnJRHRd-orrsh9lBQPl9WE2A2AEI-ZD'}     


insert into content_cards ( slide_id, type, title, content ) values ( 22, 'text', 'INSTRUCTIONS', 'Use the arrows to navigate the slides. Use the restart button to jump to the beginning of the video. Use the play/pause button to pause the video. Use the create slide input to create a slide with a new title.' );


           channelList: [{id: 1, name: 'electrical'}, {id: 2, name: 'assembly'}, {id: 3, name: 'testing'}, {id: 4, name: 'packaging'}, {id: 5, name: 'shipping'}, {id: 6, name: 'lot tracking'}, {id: 7, name: 'orders'}, {id: 8, name: 'payroll'}],
            permList: [{user_id: 1, email: 'a@a.com', permissions: [{channel_id: 1, access: true}, {channel_id: 2, access: true}, {channel_id: 3, access: true}, {channel_id: 4, access: true}, {channel_id: 5, access: true}, {channel_id: 6, access: true}, {channel_id: 7, access: false}, {channel_id: 8, access: true}]},
            {user_id: 2, email: 'bbbbbb@bbbbbb.com', permissions: [{channel_id: 1, access: false}, {channel_id: 2, access: true}, {channel_id: 3, access: false}, {channel_id: 4, access: true}, {channel_id: 5, access: true}, {channel_id: 6, access: true}, {channel_id: 7, access: false}, {channel_id: 8, access: true}]}],
            


                        channelList: [{id: 1, name: 'electrical'}, {id: 2, name: 'assembly'}, {id: 3, name: 'testing'}, {id: 4, name: 'packaging'}, {id: 5, name: 'shipping'}, {id: 6, name: 'lot tracking'}, {id: 7, name: 'orders'}, {id: 8, name: 'payroll'}],
            permList: [{user_id: 1, email: 'a@a.com', permissions: [{channel_id: 1, access: true}, {channel_id: 2, access: true}, {channel_id: 3, access: true}, {channel_id: 4, access: true}, {channel_id: 5, access: true}, {channel_id: 6, access: true}, {channel_id: 7, access: false}, {channel_id: 8, access: true}]},
            {user_id: 2, email: 'bbbbbb@bbbbbb.com', permissions: [{channel_id: 1, access: false}, {channel_id: 2, access: true}, {channel_id: 3, access: false}, {channel_id: 4, access: true}, {channel_id: 5, access: true}, {channel_id: 6, access: true}, {channel_id: 7, access: false}, {channel_id: 8, access: true}]}],