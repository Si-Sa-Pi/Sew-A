const express = require('express');
const router = express.Router();

router.get('/detailmycars',
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
            client.query('SELECT * FROM tb_cars, tb_user WHERE tb_cars.owner_id = tb_user.user_id', (err, result) => {
                console.log("Get detail cars data that yours")
                res.render('pages/detail_my_cars', {data: result.rows});
                console.log(result.rows)
                client.end()
            })
        };
    }
);



module.exports = router;