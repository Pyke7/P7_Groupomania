const connection = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => { // inscription sécurisée au réseau social
    const {prenom, nom, email, password} = req.body;

    if(!prenom || !nom || !email || !password ) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs'});
    }

    bcrypt.hash(password, 10)
        .then(hash => {
            connection.query('INSERT INTO `user` (`prenom`, `nom`, `email`, `password`) VALUES (?, ?, ?, ?)', [prenom, nom, email, hash], 
                function(err, result) {
                    if (err) {
                        return res.status(400).json({ err });
                    }
                    res.status(201).json({ message: 'User created!'});  
                }
            );
        })
        .catch(error => {
            res.status(500).json({ error })
        });
};

exports.login = (req, res) => { //connexion sécurisée au réseau social avec token
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields !' });
    }

    connection.query('SELECT * FROM user WHERE email = ?', [email], 
    function(err, result) {

        if(err || !result.length) {
            return res.status(404).json({ message: 'User not found'});
        }
        const user = result[0];
        bcrypt.compare(password, user.password) 
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Password is invalid'})
                }
                let token = jwt.sign(
                    { userId: user.id},
                    process.env.TOKEN_KEY,
                    { expiresIn: '24h'}
                );
                res.status(201).json({
                    userId: user.id,
                    token
                })
            }) 
            .catch(err => res.status(401).json({ message: 'Password is invalid'}))
    })
};

// exports.deleteAccount = (req, res) => { //supprime son propre compte
//     const id = req.auth.userId;
//     connection.query('DELETE FROM user WHERE id = ?', [id],
//     function(err, result) {
//         if(err || !result.affectedRows) {
//             return res.status(400).json({ err : "User not found" });
//         } 
//         res.status(200).json({ message: "Account deleted !"})
//     });
// };

exports.getUser = (req, res) => { //récupère les informations de son propre compte
    connection.query('SELECT * FROM user WHERE id=?', req.auth.userId,
    function(err, result) {
        if (err || !result[0]) {
            return res.status(404).json({ err : "User not found" });
        }
        return res.status(200).json(result[0]);
    })
};