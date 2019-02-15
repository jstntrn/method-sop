module.exports = {
    createVideo: (req, res) => {
        const db = req.app.get('db');
        const { videoURL, videoTitle, videoImage, userID } = req.body;
        db.video.create_video([userID, videoURL, videoImage, videoTitle])
        .then((video) => res.status(200).send(video))
        .catch((err) => console.log(err))
    },
}