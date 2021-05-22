require('dotenv').config();
console.log(process.env.ATLAS_URL)
const mongoose = require('mongoose');
const mongodb_url = process.env.ATLAS_URL
const domainName = process.env.domainName
const config = {
    mongodb_url,
    jwt_secret: process.env.JWT_SECRET || 'rideshare',
    mailConfig: {
        user: process.env.GMAIL_ADDRESS || '2017.atharva.date@ves.ac.in',
        pass: process.env.GMAIL_PASSWORD || 'password'
    },
    domainName,
    google_map_api_key: process.env.GOOGLE_MAP_API_KEY || 'apikeyNotFound',
    default_driver_seat_number: 2
};

module.exports=config;