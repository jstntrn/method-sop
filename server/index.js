const express = require('express');
require('dotenv').config();
const massive = require('massive');
const { SERVER_PORT, DB_CONNECTION, SESSION_SECRET, SENDGRID_API_KEY, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY } = process.env;
const ac = require('./controllers/authController');
const chc = require('./controllers/channelController');
const cc = require('./controllers/contentController');
const pec = require('./controllers/permissionsController');
const pc = require('./controllers/projController');
const sc = require('./controllers/slideController');
const vc = require('./controllers/vidController');
const session = require('express-session');
const aws = require('aws-sdk');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
// const path = require('path'); // Usually moved to the start of file, used for react router browser history

const app = express();
sgMail.setApiKey(SENDGRID_API_KEY);
app.use(express.json())
app.use( express.static( `${__dirname}/../build` ) );
app.use(session({
  secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: null
}));
app.use(cors());
app.use(require("body-parser").text());

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

//channel data
app.get('/api/channels/:user', chc.getChannels);
app.post('/api/channels', chc.createChannel)


//permissions data
app.get('/api/permissions/:user', pec.getPermissions);
app.post('/api/permission/', pec.createPermission);
// app.put('/api/permissions/:id', pec.editPermission)

//sendgrid
 app.get('/api/send-email', (req, res) => {
  const { to, from, subject, text, html } = req.query
  const msg = {
      to: to,
      from: from,
      subject: subject,
      text: text,
      html: html,
    };
    sgMail.send(msg)
    .catch(err => console.log(err));
  }
)

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

//stripe
app.post("/charge/:amount", async (req, res) => {
  const amountArray = req.params.amount.toString().split('');
  const pennies = [];
  for (var i = 0; i < amountArray.length; i++) {
    if(amountArray[i] === ".") {
      if (typeof amountArray[i + 1] === "string") {
        pennies.push(amountArray[i + 1]);
      } else {
        pennies.push("0");
      }
      if (typeof amountArray[i + 2] === "string") {
        pennies.push(amountArray[i + 2]);
      } else {
        pennies.push("0");
      }
    	break;
    } else {
    	pennies.push(amountArray[i])
    }
  }
  const convertedAmt = parseInt(pennies.join(''));

  try {
    let {status} = await stripe.charges.create({
      amount: convertedAmt,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});


//browser history react router for production
// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// });