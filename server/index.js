const express = require('express');
require('dotenv').config();
const massive = require('massive');
const { SERVER_PORT, DB_CONNECTION, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
const ac = require('./controllers/authController');
const cc = require('./controllers/contentController');
const pc = require('./controllers/projController');
const sc = require('./controllers/slideController');
const vc = require('./controllers/vidController');
const session = require('express-session');
const aws = require('aws-sdk');

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
app.post('/api/video', vc.createVideo);
app.get('/api/videos/:user', vc.getVideos);

//slide data
app.get('/api/slides/:project', sc.getSlides);
app.post('/api/slide/:project', sc.createSlide);

//content card data
app.post('/api/content/:slide', cc.createContent);
app.get('/api/content/:slide', cc.getSlideContent);
app.delete('/api/content/:id', cc.deleteContent);

//aws
//just a simple get endpoint, make sure it matches what you have on your front end. We'll write out the function here instead of putting it inside of a controller. 
app.get('/sign-s3', (req, res) => {

    //set the config object that we're going to send - make sure your region matches the region code you specified when you created your bucket, and then put your access key and secret access key on the object as well
   
     aws.config = {
       region: 'us-west-1',
       accessKeyId: AWS_ACCESS_KEY_ID,
       secretAccessKey: AWS_SECRET_ACCESS_KEY
     }
     
     // we're using a function invoked from aws, grabbing our filename and filetype
     const s3 = new aws.S3();
     const fileName = req.query['file-name'];
     const fileType = req.query['file-type'];
     // and using these as a s3Params object that we are going to send to amazon (that function is accessible on the new s3 object instance we created)
     // add your bucket name, add the key as the fileName, how long the request will be active for (in seconds), filetype, and ACL as 'public-read'
     const s3Params = {
       Bucket: S3_BUCKET,
       Key: fileName,
       Expires: 60,
       ContentType: fileType,
       ACL: 'public-read'
     };
    // now that we have our params configured, lets call the getSignedURL function (also lives on the s3 instance) tell it to 'putObject', provide the params, and as soon as that's run, it will execute a callback function we provide it.
     s3.getSignedUrl('putObject', s3Params, (err, data) => {
       if(err){
         console.log(err);
         return res.end();
       }
       // We can build our own URL here, as this is the format of the URL. Send back data if nothing erred. This data is Amazons go ahead to post something. We'll create an object called returnData, and then send that back to the front end! 
       const returnData = {
         signedRequest: data,
         url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
       };
   
       return res.send(returnData)
     });
   });