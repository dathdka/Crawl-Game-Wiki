require('dotenv')
const auth = (req,res,next) =>{
    const {secretKey} = req.body
    if(secretKey !== process.env.SECRET_KEY)
        res.status(401).send('invalid token')
    else
        return next();
}
module.exports = auth