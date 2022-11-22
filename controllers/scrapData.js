const crawItem = require('../scraping/crawItem')
const scrapData = async (req, res )=>{
    console.log('start crawling data ...')
    await crawItem()
    res.status(200)
}

module.exports = scrapData