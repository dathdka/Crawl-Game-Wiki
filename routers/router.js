const express = require('express')
const gameControllers = require('../controllers/gameControllers')
const router = express.Router()


router.get('/scrap',gameControllers.controllers.scrapData)
router.post('/info',gameControllers.controllers.info)
router.post('/crafting',gameControllers.controllers.crafting)
router.post('/can-crafting',gameControllers.controllers.canCrafting)
module.exports = router