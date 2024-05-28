const pool = require('./connectiondb.js');

async function getProductDetails(productId) {
  try {
    // Acquire a connection from the pool
    const connection = await pool.getConnection();
    
    // Query to fetch product details based on ProductID
    const query = 'SELECT ProductID, ProductName, Description, Price, QuantityAvailable FROM product WHERE ProductID = ?';

    // Execute the query
    const [rows] = await connection.query(query, [productId]);
    
    // Release the connection back to the pool
    connection.release();

    // Check if the product exists
    if (rows.length === 0) {
      throw new Error('Product not found');
    }

    // Return the product details
    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Usage example
const productId = 1; // Replace with the desired ProductID

(async () => {
  try {
    const product = await getProductDetails(productId);
    console.log('Product Details:');
    console.log('ProductID:', product.ProductID);
    console.log('ProductName:', product.ProductName);
    console.log('Description:', product.Description);
    console.log('Price:', product.Price);
    console.log('QuantityAvailable:', product.QuantityAvailable);
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
})();