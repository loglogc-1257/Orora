const { MongoClient } = require('mongodb'); // Import MongoClient from the mongodb package

const uri = "mongodb+srv://korisawarezero:QV1c3LOUtbnAjRtQ@cluster0.8wig732.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB connection string

const client = new MongoClient(uri);

async function getUserName(userId) {
  try {
    await client.connect();
    const database = client.db('Cluster0'); // Replace 'your_database_name' with your database name
    const usersCollection = database.collection('users'); // Replace 'users' with your collection name

    const user = await usersCollection.findOne({ userId: userId }); // Find the user by userId
    return user?.name || null; // Return the user's name or null if not found

  } catch (error) {
    console.error('Error fetching user name:', error);
    return null;
  } finally {
    // Ensures that the client will close when you finish
    // and helps prevent resource leaks
    await client.close();
  }
}

module.exports = { getUserName };

