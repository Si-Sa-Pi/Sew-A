const express = require('express');
const router = express.Router();

router.get('/',
    async (req, res) => {
        //cek user session/login status
        console.log(req.session.user);
        var userData = req.session.user
        if (!req.session.user) {
            res.redirect('auth/login');
        }   else {
            res.render('pages/profile', userData);
        }
    }
);

router.get('/edit',
    async (req, res) => {
        //cek user session/login status
        console.log(req.session.user);
        var userData = req.session.user
        if (!req.session.user) {
            res.redirect('auth/login');
        }   else {
            res.render('pages/editprofile', userData);
        }
    }
);

router.post('/edit',
    async(req, res) => {
        //get user input
        const car_id = req.body.car_id;
        console.log(car_id);

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
        client.query('UPDATE tb_user set fullname = \''+fullname+'\', username = \''+username+'\', email = \''+email+'\', phone = \''+phone+'\', id_number = \''+id_number+'\', dob = \''+dob+'\', address = \''+address+'\' FROM tb_user WHERE user_id = '+user_id+';', (err, result) => {
            console.log(result);
            var userData = req.session.user
            var datapage = userData
            datapage.result = result.rows
            console.log('===================================================');
            console.log(datapage)
            datapage.profile_pic = datapage.profile_pic==null?'':datapage.profile_pic
            if (!req.session.user) {
                res.redirect('auth/login');
            }   else {
                res.render('pages/editprofile', datapage);
            }
            // console.log(result.rows)
            client.end()
        })

    }
);

module.exports = router;