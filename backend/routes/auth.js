const express = require('express');
// const router = require('.');
const router = express.Router();

router.get('/login',
    async (req, res) => {
        console.log("adsf")
        if (req.session.user) {
            res.redirect('/');
        }   else {
            // res.render('pages/login');
            res.render('pages/login', {layout: false, username: 'John Doe' });
        }
    }
);

router.post('/login',
    async(req, res) => {
        //get user input
        const username = req.body.username;
        const password = req.body.password;
        console.log(username)
        console.log(password)
        //cek username & password

        const { Client } = require('pg')
        const client = new Client({
            user: 'tevnbwjukzhcuu',
            host: 'ec2-54-84-98-18.compute-1.amazonaws.com',
            database: 'd9m48mnamvvvhs',
            password: '7a49fcba2a7e5cfe512d9548f81ecf772e98c1f13cd766e81230f0448e1bf8a3',
            port: 5432,
            ssl: {rejectUnauthorized: false},
        })
        client.connect()
        client.query('SELECT * FROM tb_user WHERE username = \''+username+'\' AND userpassword = \''+password+'\'', (err, result) => {
            console.log(result);
            if (result.rows.length!=0) {
                //session
                console.log("user ditemukan, lapor")
                req.session.user = result.rows[0];

                console.log("uda masuk");
                //login success and redirect
                res.redirect('/home');   
            }   else {
                res.render('pages/login', { layout: false, error: 'Wrong username or password' });
            }
            client.end()
        })

    }
);

router.get('/logout',
    async (req, res) => {
        //destroy all session
        req.session.destroy();

        //redirect to login
        res.redirect('/login/login');
    }
);

module.exports = router;