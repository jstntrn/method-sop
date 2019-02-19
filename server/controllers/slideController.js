module.exports = {
    getSlides: (req, res) => {
        const db = req.app.get('db');
        const { project } = req.params
        db.slide.get_project_slides([project])
        .then(slides => {res.status(200).send(slides)})
        .catch(err => {console.log(err)})
    },
    createSlide: (req, res) => {
        const db = req.app.get('db');
        const project_id = Number(req.params.project);
        const { pause_time, title } = req.body;
        db.slide.create_slide([project_id, pause_time, title])
        .then((slide) => res.status(200).send(slide))
        .catch((err) => console.log(err))
    }
}