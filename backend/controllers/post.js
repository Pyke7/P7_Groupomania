const connection = require("../database/db");
const fs = require("fs");

exports.createPost = (req, res) => {
  const message = req.body.message;
  let imageUrl = "";

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    imageUrl = null;
  }

  const timestamps = Date.now();
  const userId = req.auth.userId;

  connection.query(
    "INSERT INTO post (message, imageUrl, timestamps, user_id) values (?, ?, ?, ?)",
    [message, imageUrl, timestamps, userId],
    function (err, result) {
      if (err) {
        return res.status(400).json({ err });
      }
      res.status(200).json({ message: "Post created !" });
    }
  );
};

exports.getAllPosts = (req, res) => {
  connection.query(
    "SELECT post.id, post.message, post.imageUrl, post.timestamps, post.user_id, post.likes, post.userLiked, user.prenom, user.nom FROM post JOIN user ON post.user_id = user.id ORDER BY timestamps DESC", //permet de récupérer les posts créés dans un ordre antéchronologique
    function (err, result) {
      if (err || !result[0]) {
        return res.status(404).json({ message: "There is no post" });
      }
      return res.status(200).json(result);
    }
  );
};

exports.updatePost = (req, res) => {
  const postId = req.params.id;
  connection.query(
    "SELECT * FROM post WHERE id= ?",
    [postId],
    function (err, result) {
      if (err) {
        return res.status(404).json({ message: "The post was not found" });
      }

      if (result[0].user_id !== req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized Request !" });
      }

      if (req.file) {
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
        const message = req.body.message;

        const filename = result[0].imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          connection.query(
            "UPDATE post SET message = ?, imageUrl = ? WHERE id = ? ",
            [message, imageUrl, postId],
            function (err, result) {
              if (err || !result.affectedRows) {
                return res.status(400).json({ err: "Post not found" });
              }
              return res.status(200).json({ message: "Modified post" });
            }
          );
        });
      } else {
        const message = req.body.message;
        connection.query(
          "UPDATE post SET message = ? WHERE id = ? ",
          [message, postId],
          function (err, result) {
            if (err || !result.affectedRows) {
              return res.status(400).json({ err: "Post not found" });
            }
            return res.status(200).json({ message: "Modified post" });
          }
        );
      }
    }
  );
};

exports.deletePost = (req, res) => {
  //supprime un post de la BDD en fonction de son id
  const postId = req.params.id;
  connection.query(
    "SELECT * FROM post WHERE id= ?",
    [postId],
    function (err, result) {
      if (err) {
        return res.status(404).json({ message: "The post was not found" });
      }

      if (req.auth.admin || result[0].user_id === req.auth.userId) {
        if (result[0].imageUrl) {
          const filename = result[0].imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            connection.query(
              "DELETE FROM post WHERE id= ?",
              [postId],
              function (err, result) {
                if (err || !result.affectedRows) {
                  return res.status(400).json({ err: "Post not found" });
                }
                return res.status(200).json({ message: "Deleted post" });
              }
            );
          });
        } else {
          connection.query(
            "DELETE FROM post WHERE id= ?",
            [postId],
            function (err, result) {
              if (err || !result.affectedRows) {
                return res.status(400).json({ err: "Post not found" });
              }
              return res.status(200).json({ message: "Deleted post" });
            }
          );
        }
      } else {
        return res.status(401).json({ message: "Unauthorized Request !" });
      }
    }
  );
};

exports.likePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.auth.userId;

  connection.query(
    "SELECT * FROM post WHERE id = ?",
    [postId],
    function (err, result) {
      if (err || !result[0]) {
        return res.status(404).json({ message: "Post not found" });
      }

      let newUsersLiked = [];
      let newLikes = result[0].likes;
      
      if (!result[0].userLiked || result[0].userLiked === "NULL") {
        newUsersLiked.push(userId);
        newLikes++;
      } else {
        newUsersLiked = JSON.parse(result[0].userLiked);
        
        if (!newUsersLiked.includes(userId)) {
          newUsersLiked.push(userId);
          newLikes++;
        } else {
          const userIdIndex = newUsersLiked.indexOf(userId);
          newUsersLiked.splice(userIdIndex, 1);
          newLikes--;
        }
      }
      
      connection.query(
        "UPDATE post SET likes = ?, userLiked =? WHERE id =?", [newLikes, JSON.stringify(newUsersLiked), postId],
        function (err, result) {
          if (err || !result.affectedRows) {
            res.status(400).json({err});
          }
          connection.query(
            'SELECT * FROM post WHERE id= ?', [postId],
            function (err, result) {
              if (err || !result[0]) {
                return res.status(404).json({ message: "Post not found" });
              }
              return res.status(200).json(result[0]);
            }
          )
        }
        )
    }
  );
};
