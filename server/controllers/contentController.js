module.exports = {
    createContent: (req, res) => {
        const db = req.app.get('db');
        const { slide } = req.params;
        const { type, title, content } = req.body
        db.content.create_content([ slide, type, title, content ])
        .then(content => {res.status(200).send(content)})
        .catch(err => console.log(err))
    },
    getSlideContent: (req, res) => {
        const db = req.app.get('db');
        const { slide } = req.params;
        db.content.get_slide_content([slide])
        .then(content => {res.status(200).send(content)})
        .catch(err => console.log(err))
    }
}