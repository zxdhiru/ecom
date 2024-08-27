require('dotenv').config()
const express = require("express")

const app = express()

const cors = require('cors')

// const { id, title, price, category, image, description, rating } = require('./product');
const { addProduct, getProducts, updateProduct, deleteProduct } = require("./products/controller");
const { default: mongoose } = require("mongoose");

app.use(express.json())

app.use((req, res, next)=> {
    console.log(req.method, req.path, req.headers['apikey'], req.headers['origin']);
    next()
})

function checkApiKey(req, res, next) {
    const apikey = req.headers['apikey'];

    if (!apikey) {
        return res.status(401).json({error: "Please Login! User Unauthorized"});
    }

    next();
}


var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.post('/', checkApiKey, addProduct)
app.get('/products', checkApiKey, getProducts)
app.patch('/products', checkApiKey, updateProduct)
app.delete('/products', checkApiKey, deleteProduct)

// connect to db
mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port 3000 -> http://localhost:3000 & Connected to DB`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
    
