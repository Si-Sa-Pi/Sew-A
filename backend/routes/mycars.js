const express = require('express');
const router = express.Router();

router.get('/mycars',
    async (req, res) => {
        //cek user session/login status
        if (!req.session.user) {
            res.redirect('auth/login');
        }   else {
            console.log('uda masuk uy'); 
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
            var userData = req.session.user
            client.connect()
            client.query('SELECT * FROM tb_cars WHERE owner_id = '+userData.user_id+';', (err, result) => {
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
                    res.render('pages/mycars', datapage);
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
        client.query('SELECT car_name, fullname, transmission, seat, car_location, even_odd FROM tb_cars, tb_user WHERE user_id=owner_id and car_id = '+car_id+';', (err, result) => {
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
                res.render('pages/detailmycars', datapage);
            }
            // console.log(result.rows)
            client.end()
        })

    }
);

router.get('/edit',
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
        client.query('SELECT car_name, fullname, transmission, seat, car_location, even_odd FROM tb_cars, tb_user WHERE user_id=owner_id and car_id = '+car_id+';', (err, result) => {
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
                res.render('pages/editmycars', datapage);
            }
            // console.log(result.rows)
            client.end()
        })

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
        client.query('UPDATE tb_cars SET car_name = \''+new_name+'\', car_seat = \''+new_car_seat+'\', transmission = \''+new_transmission+'\', location = \''+new_location+'\', no_polisi = \''+new_evenodd+'\'', (err, result) => {
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
                res.render('pages/detailmycars', datapage);
            }
            // console.log(result.rows)
            client.end()
        })

    }
);

router.post('/add',
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
        client.query('INSERT INTO tb_user (car_name, transmission, seat, car_location, even_odd, features, car_year, car_pic, price) VALUES (\''+car_name+'\', \''+transmission+'\', \''+seat+'\', \''+car_location+'\', \''+even_odd+'\', \''+features+'\', \''+car_year+'\', \''+car_pic+'\', \''+price+'\');', (err, result) => {
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
                res.render('pages/addmycars', datapage);
            }
            // console.log(result.rows)
            client.end()
        })

    }
);
module.exports = router;