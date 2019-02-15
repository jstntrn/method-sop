module.exports = {
    createVideo: (req, res) => {
        const db = req.app.get('db');
        const { videoURL, videoTitle, videoImage, userID } = req.body;
        db.video.create_video([userID, videoURL, videoImage, videoTitle])
        .then(() => res.sendStatus(200))
        .catch((err) => console.log(err))
    },
}