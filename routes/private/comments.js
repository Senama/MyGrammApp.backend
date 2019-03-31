
const CommentRoute = require('express').Router();

const CommentServices = require('../services/commentservices');

CommentRoute.post('/', (request, response) => {
    const {userid, postid, text} = request.body;
    if (!userid || !postid || !text) {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        CommentServices.createComment(userid, postid, text)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Comment posted sucessfully`,
                });
            })
            .catch(err => {
                response.status(400);
                response.json({
                    'msg': `err. Something went wrong.`,
                });
            });
    }
});

CommentRoute.delete('/:postid', (request, response) => {
    const {postid} = request.params;
    if (!postid || isNaN(parseInt(postid))) {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        CommentServices.deleteComment(postid)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Comment deleted successfully.`,
                });
            })
            .catch(err => {
                response.status(400);
                response.json({
                    'msg': `err. Something went wrong.`,
                });
            });
    }
});

module.exports = CommentRoute;