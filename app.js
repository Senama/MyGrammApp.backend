const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    res.status(200);
    res.json(id);
});

module.exports = {
    app,
};