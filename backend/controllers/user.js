const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../database/db');

exports.signup = (req, res) => {
    const prenom = req.body.prenom;
    const nom = req.body.nom;
    const email = req.body.email;
    const password = req.body.password;

    if(!prenom || !nom || !email || !password ) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs'});
    }

    bcrypt.hash(password, 10)
        .then(hash => {
            const hashPassword = hash;

            connection.query('INSERT INTO `user` (`prenom`, `nom`, `email`, `password`) VALUES (?, ?, ?, ?)', [prenom, nom, email, hashPassword], 
                function(err, result) {
                    if (err) {
                        return res.status(400).json({ err });
                    }
                    res.status(201).json({ message: 'User created!'});  
                }
            );
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error })
        });
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
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
                    return res.status(401).json({ message: 'Mot de passe incorrect'})
                }
                res.status(201).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id},
                        process.env.TOKEN_KEY,
                        { expiresIn: '24h'}
                    )
                })
            }) 
            .catch(err => res.status(401).json({ message: 'Mot de passe incorrect'}))
    })
};

exports.deleteAccount = (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM user WHERE id = ?', [id],
    function(err, result) {
        if(err) {
            return res.status(400).json({ err });
        } 
        // if () {

        //     res.status(200).json({ message : 'Utilisateur supprimé'});
        // }
    });
};