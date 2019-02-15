module.exports = {
    createProject: (req, res) => {
        const db = req.app.get('db');
        const { video_id, user_id, title, image_url } = req.body;
        console.log(req.body)
        db.project.create_project([video_id, user_id, title, image_url])
        .then(() => res.sendStatus(200))
        .catch((err) => console.log(err))
    },
    getProjects: (req, res) => {

    },
}