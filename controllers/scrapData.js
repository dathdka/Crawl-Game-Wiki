const crawItem = require('../scraping/crawItem')
const scrapData = async (req, res )=>{
    await crawItem()
    res.status(200)
}

module.exports = scrapData