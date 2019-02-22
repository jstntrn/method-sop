module.exports = {
    createContent: (req, res) => {
        const db = req.app.get('db');
        const { slide } = req.params;
        const { type, title, content, url } = req.body
        db.content.create_content([ slide, type, title, content, url ])
        .then(content => {res.status(200).send(content)})
        .catch(err => console.log(err))
    },
    getSlideContent: (req, res) => {
        const db = req.app.get('db');
        const { slide } = req.params;
        db.content.get_slide_content([slide])
        .then(content => {res.status(200).send(content)})
        .catch(err => console.log(err))
    },
    deleteContent: (req, res) => {
        const db = req.app.get('db');
        const contentID = Number(req.params.id);
        db.content.delete_content([contentID])
        .then(content => {res.status(200).send(content)})
        .catch(err => {console.log(err)})
    }
}