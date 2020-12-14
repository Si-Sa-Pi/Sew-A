const express = require('express');
const router = express.Router();

router.post('/addmycars',
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
            client.query('INSERT INTO tb_user (car_name, transmission, seat, car_location, even_odd, features, car_year, car_pic, price) VALUES (\''+car_name+'\', \''+transmission+'\', \''+seat+'\', \''+car_location+'\', \''+even_odd+'\', \''+features+'\', \''+car_year+'\', \''+car_pic+'\', \''+price+'\');', (err, result) => {
                console.log("Added to your cars")
                res.render('pages/my_cars', {data: result.rows});
                console.log(result.rows)
                client.end()
            })
        };
    }
);



module.exports = router;