const express = require('express')
const gameControllers = require('../controllers/gameControllers')
const router = express.Router()


router.get('/scrap',gameControllers.controllers.scrapData)

module.exports = router