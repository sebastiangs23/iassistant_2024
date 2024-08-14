import mongoose from "mongoose";
import 'dotenv/config.js';

const uri = process.env.URI_MONGO || 'mongodb://0.0.0.0:27017/dev';

mongoose
  .connect(uri)
  .then(() => console.log("CONNECTED WITH MONGODB."))
  .catch((err) => console.log(`ERROR TRYING TO CONNECT TO THE DB.`, err));

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('CONNECTED !!!');
    
});

connection.on('error', (error) => {
    console.log('ERROR TRYING TO CONNECT', error);
});

export default connection;