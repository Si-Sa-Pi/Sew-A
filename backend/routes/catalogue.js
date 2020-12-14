const express = require('express');
const router = express.Router();

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
            client.connect()
            client.query('SELECT * FROM tb_cars WHERE availability = true', (err, result) => {
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
                res.render('pages/detailcatalogue', datapage);
            }
            // console.log(result.rows)
            client.end()
        })

    }
);

router.get('/registration',
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
                res.render('pages/registration', datapage);
            }
            client.end()
        })
    }
);

router.post('/payment',
    async(req, res) => {
        setInterval(function() {  
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
            client.query('UPDATE tb_cars SET availability = false WHERE car_id = '+car_id+';', (err, result) => {
               console.log(result);},     
            client.query('insert into tb_rents(car_id, owner_id, rentee_id, price, pu_time, return_time, license_pic, driver_license_pic) values ('+car_id+', select owner_id from tb_cars where owner_id = '+owner_id+','+user_id+',select price from tb_cars where car_id = '+car_id+',\''+pu_time+'\',\''+return_time+'\',null, null)   ', (err, result) => {
                console.log(result);},    
            res.render('pages/myrents', datapage)),
                client.end()
           }, 1000);
    }
);

module.exports = router;