module.exports = {
    createProject: (req, res) => {
        const db = req.app.get('db');
        const { video_id, user_id, title, image_url } = req.body;
        db.project.create_project([video_id, user_id, title, image_url])
        .then((project) => res.status(200).send(project))
        .catch((err) => console.log(err))
    },
    getProjects: (req, res) => {
        const db = req.app.get('db');
        const { user } = req.params;
        db.project.get_projects([user])
        .then(projects => {res.status(200).send(projects)})
        .catch(err => {res.status(500).send('error getting projects')})
    },
    getProjectVid: (req, res) => {
        const db = req.app.get('db');
        const projectID = (Number(req.query.project));
        db.project.get_project_video([projectID])
        .then(video => {res.status(200).send(video)})
        .catch(err => {console.log(err)})
    },
    deleteProject: (req, res) => {
        const db = req.app.get('db');
        const projectID = Number(req.params.id);
        db.project.delete_project([projectID])
        .then(projects => {res.status(200).send(projects)})
        .catch(err => {console.log(err)})
    },
    editTitle: (req, res) => {
        const db = req.app.get('db');
        const projectID = Number(req.params.id);
        const { title } = req.body;
        db.project.edit_project_title([title, projectID])
        .then(projects => {res.status(200).send(projects)})
        .catch(err => {console.log(err)})
    }
}