module.exports = {
    getPermissions: (req, res) => {
        const db = req.app.get('db');
        const { user } = req.params;
        db.permission.get_permissions([user])
        .then(permissions => {res.status(200).send(permissions)})
        .catch(err => {res.status(500).send(err)})
    },
    createPermission: (req, res) => {
        const db = req.app.get('db');
        const { channel_id, view, email } = req.body;
        db.permission.create_permission([channel_id, view, email])
        .then((permission) => res.status(200).send(permission))
        .catch((err) => console.log(err))
    },
    editPermissions: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        const { view } = req.body;
        db.permission.edit_permission([id, view])
        .then(permission => {res.status(200).send(permission)})
        .catch(err => {console.log(err)})
    }
}