module.exports = {
    getChannels: (req, res) => {
        const db = req.app.get('db');
        const { user } = req.params;
        db.channel.get_channels([user])
        .then(channels => {res.status(200).send(channels)})
        .catch(err => {res.status(500).send(err)})
    },
    createChannel: (req, res) => {
        const db = req.app.get('db');
        const { name, owner_id } = req.body;
        db.channel.create_channel([name, owner_id])
        .then((channel) => res.status(200).send(channel))
        .catch((err) => console.log(err))
    }
}