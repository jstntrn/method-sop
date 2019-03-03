module.exports = {
    getAccess: (req, res) => {
        const db = req.app.get('db');
        const { owner } = req.params;
        db.access.get_access([owner])
        .then(access => {res.status(200).send(access)})
        .catch(err => {res.status(500).send(err)})
    },
    createAccess: (req, res) => {
        const db = req.app.get('db');
        const { owner_id, user_email } = req.body;
        db.access.create_access([owner_id, user_email])
        .then((access) => res.status(200).send(access))
        .catch((err) => console.log(err))
    },
    deleteAccess: (req, res) => {

    }
}