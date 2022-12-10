const express = require('express')
const gameControllers = require('../controllers/gameControllers')
const middleware = require('../middleware/auth')
const router = express.Router()


router.post('/scrap',middleware,gameControllers.controllers.scrapData)
router.get('/getAllItem',gameControllers.controllers.getAllItem)
router.post('/info',middleware,gameControllers.controllers.info)
router.post('/crafting',middleware,gameControllers.controllers.crafting)
router.post('/can-crafting',middleware,gameControllers.controllers.canCrafting)
router.post('/getItemById',middleware,gameControllers.controllers.getItemById)
module.exports = router