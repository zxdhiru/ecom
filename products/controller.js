const Product = require('./productModel')

const getProducts = async (req, res) => {
    try {
        const product = await Product.find({})
        return res.status(201).json(product)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const addProduct = async (req, res) => {

    const { title, originalPrice, offerPrice, category, image, description, rating } = req.body

    try {

        if(!title) return res.status(400).json({error: "Title is required"})
        if(!originalPrice) return res.status(400).json({error: "Original price is required"})
        if(!offerPrice) return res.status(400).json({error: "Offer price is required"})
        if(!category) return res.status(400).json({error: "Category is required"})
        if(!image) return res.status(400).json({error: "Image is required"})
        if(!description) return res.status(400).json({error: "Description is required"})

        const product = await Product.create({ title, originalPrice, offerPrice, category, image, description, rating })
        console.log(product);
        res.status(201).json({message: "Product added successfully!"})
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
}

const updateProduct = async (req, res) => {
    const { _id, title, originalPrice, offerPrice, category, image, description } = req.body

    try {
        if(!_id) return res.status(404).json({error: "Product Id not found!"})
        const updatedProduct = await Product.findOneAndUpdate({ _id }, {title, originalPrice, offerPrice, category, image, description})
        console.log(updatedProduct);
        res.status(201).json({message: "Product updated successfully!"})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
} 

const deleteProduct = async (req, res) => {
    const { _id } = req.body
    try {
        if(!_id) return res.status(404).json({error: "Unable to get the product!"})
        const deletedProduct = await Product.findByIdAndDelete({_id})
        console.log(deletedProduct);
        res.status(201).json({message: "Product Deleted successfully!"})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
}