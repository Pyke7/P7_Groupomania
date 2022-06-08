const connection = require('../database/db');
const fs = require('fs');

exports.createPost = (req, res) => {
    console.log(JSON.parse(req.body.post))
    // const postObject = JSON.parse(req.body.post);
    // console.log(postObject);
    const message = req.body.message;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const timestamps = Date.now();
    const userId = req.auth.userId;
    
    connection.query('INSERT INTO post (message, imageUrl, timestamps, userId) values (?, ?, ?, ?)', [message, imageUrl, timestamps, userId], 
    function (err, result) {
        if (err) {
            return res.status(400).json({ err });
        }
        res.status(200).json({ message: 'Post créé !'})
    })
};

exports.getAllPosts = (req, res) => {
    connection.query('SELECT * FROM post ORDER BY timestamps DESC', //permet de récupérer les posts créés dans un ordre antéchronologique
    function (err, result) {
        if (err || !result[0]) {
            return res.status(404).json({ message: "There is no post"});
        }
        console.log(result)
        return res.status(200).json(result);
    })
};

exports.updatePost = (req, res) => {

};

exports.deletePost = (req, res) => { //supprime un post de la BDD en fonction de son id 
    const postId = req.params.id;
    connection.query('SELECT * FROM post WHERE id= ?', [postId],
    function (err, result) {
        if (err) {
            return res.status(404).json({ message: "The post was not found"})
        }

        if (result[0].userId !== req.auth.userId) {
            return res.status(401).json({ message: "Unauthorized Request !"})
        }

        const filename = result[0].imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            connection.query('DELETE FROM post WHERE id= ?', [postId], 
            function (err, result) {
                if (err || !result.affectedRows) {
                    return res.status(400).json({ err: "Post not found" })
                }
                return res.status(200).json({ message: "Deleted post"})
            })
        })
    });
};