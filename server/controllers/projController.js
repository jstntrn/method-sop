module.exports = {
    createProject: (req, res) => {
        const db = req.app.get('db');
        const { video_id, user_id, title, image_url } = req.body;
        console.log(req.body)
        db.project.create_project([video_id, user_id, title, image_url])
        .then((project) => res.status(200).send(project))
        .catch((err) => console.log(err))
    },
    getProjects: (req, res) => {
        const db = req.app.get('db');
    },
    getProjectVid: (req, res) => {
        const db = req.app.get('db');
        const projectID = (Number(req.query.project));
        console.log(req.query)
        db.project.get_project_video([projectID])
        .then(video => {res.status(200).send(video)})
        .catch(err => {console.log(err)})
        
    }
}