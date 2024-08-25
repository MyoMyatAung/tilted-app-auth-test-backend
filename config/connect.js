require('dotenv').config()
const { default: mongoose } = require("mongoose");

async function connect() {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`DB CONNECTION SUCCESS`);
  } catch (error) {
    console.log(`ERROR IN DB CONNECTION ${error}`);
    process.exit(1);
  }
}

module.exports = connect;