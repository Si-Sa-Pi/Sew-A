const express = require('express');
const router = express.Router();

function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

router.get('/',
    async (req, res) => {
        //cek user session/login status
        if (!req.session.user) {
            res.redirect('auth/login');
        }   else {
            //get data from DB
            const { Client } = require('pg')
            const client = new Client({
                user: 'tevnbwjukzhcuu',
                host: 'ec2-54-84-98-18.compute-1.amazonaws.com',
                database: 'd9m48mnamvvvhs',
                password: '7a49fcba2a7e5cfe512d9548f81ecf772e98c1f13cd766e81230f0448e1bf8a3',
                port: 5432,
                ssl: {rejectUnauthorized: false},
            })
            userData = req.session.user
            client.connect()
            client.query('select * from tb_cars where car_id = (select car_id from tb_rents where rentee_id = \''+userData.user_id+'\';', (err, result) => {
                console.log("Get cars data that available")
                var userData = req.session.user
                var datapage = userData
                datapage.result = result.rows
                console.log('===================================================');
                console.log(datapage)
                datapage.profile_pic = datapage.profile_pic==null?'':datapage.profile_pic
                if (!req.session.user) {
                    res.redirect('auth/login');
                }   else {
                    res.render('pages/catalogue', datapage);
                }
                // console.log(result.rows)
                client.end()
            })
        };
    }
);

router.post('/detail',
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
        client.query('SELECT car_name, fullname, transmission, transmission, seat, car_location, even_odd FROM tb_cars, tb_user WHERE user_id=owner_id and car_id = '+car_id+';', (err, result) => {
            console.log(result);
            console.log("Get car")
            var userData = req.session.user
            var datapage = userData
            datapage.result = result.rows
            console.log('===================================================');
            console.log(datapage)
            datapage.profile_pic = datapage.profile_pic==null?'':datapage.profile_pic
            if (!req.session.user) {
                res.redirect('auth/login');
            }   else {
                res.render('pages/detailmyrents', datapage);
            }
            // console.log(result.rows)
            client.end()
        })

    }
);

// const regisRouter     = require('./registration');

// app.use('./registration'         , regisRouter);

module.exports = router;