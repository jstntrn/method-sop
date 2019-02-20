const express = require('express');
require('dotenv').config();
const massive = require('massive');
const { SERVER_PORT, DB_CONNECTION, SESSION_SECRET } = process.env;
const ac = require('./controllers/authController');
const cc = require('./controllers/contentController');
const pc = require('./controllers/projController');
const sc = require('./controllers/slideController');
const vc = require('./controllers/vidController');
const session = require('express-session');

const app = express();
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: null
}));

massive(DB_CONNECTION).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`The ship is sailing from port ${SERVER_PORT}`))
})

//authentication
app.post('/auth/login', ac.login);
app.post('/auth/register', ac.register);
app.post('/auth/logout', ac.logout);

//user data
app.get('/api/user', ac.getUser);

//project data
// app.get('/api/projects/:id', pc.getProjects);
app.post('/api/project', pc.createProject);
app.get('/api/viewer/', pc.getProjectVid);
app.get('/api/projects/:user', pc.getProjects);
app.delete('/api/project/:id', pc.deleteProject);
app.put('/api/project/:id', pc.editTitle);

//video data
app.post('/api/video', vc.createVideo)

//slide data
app.get('/api/slides/:project', sc.getSlides)
app.post('/api/slide/:project', sc.createSlide)

//content card data
app.post('/api/content/:slide', cc.createContent)
app.get('/api/content/:slide', cc.getSlideContent)
