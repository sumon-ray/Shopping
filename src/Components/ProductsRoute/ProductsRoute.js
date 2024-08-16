const express = require("express");
const router = express.Router();
const { ObjectId } = require('mongodb');

// Middleware to set database collection in request
router.use((req, res, next) => {
  req.databaseCollection = req.app.get('databaseCollection');
  if (!req.databaseCollection) {
    return res.status(500).send("Database collection is not set.");
  }
  next();
});

// GET route for retrieving products
router.get("/books", async (req, res) => {
  const databaseCollection = req.databaseCollection;
  try {
    const result = await databaseCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error retrieving products: " + error.message);
  }
});

// get product 
// router.get('/p', async (req, res) => {
//   const databaseCollection = req.app.get('databaseCollection');

//   try {
//     const count = await databaseCollection.countDocuments(); // Change to countDocuments() if needed
//     res.send({ count });
//   } catch (error) {
//     res.status(500).send("Error retrieving product count: " + error.message);
//   }
// });

// get product id
router.get('/books/:id', async (req, res) => {
  const databaseCollection = req.databaseCollection;
  const { id } = req.params;
  try {
    const result = await databaseCollection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).send("Product not found");
    }
    res.send(result);
  } catch (error) {
    res.status(500).send("Error retrieving product: " + error.message);
  }
});





module.exports = router;
