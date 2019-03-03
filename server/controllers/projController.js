module.exports = {
    createProject: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user
        const { video_id, title, image_url, channel_id } = req.body;
        db.project.create_project([video_id, id, title, image_url, channel_id])
        .then((project) => res.status(200).send(project))
        .catch((err) => console.log(err))
    },
    getProjects: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user
        db.project.get_projects([id])
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
        const { title, channelID } = req.body;
        db.project.edit_project_title([title, channelID, projectID])
        .then(projects => {res.status(200).send(projects)})
        .catch(err => {console.log(err)})
    }
}