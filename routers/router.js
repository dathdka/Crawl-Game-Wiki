const express = require('express')
const gameControllers = require('../controllers/gameControllers')
const middleware = require('../middleware/auth')
const router = express.Router()


router.get('/scrap',middleware,gameControllers.controllers.scrapData)
router.post('/info',middleware,gameControllers.controllers.info)
router.post('/crafting',middleware,gameControllers.controllers.crafting)
router.post('/can-crafting',middleware,gameControllers.controllers.canCrafting)
module.exports = router