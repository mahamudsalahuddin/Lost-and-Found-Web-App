const mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect(
      "mongodb+srv://h123:h123@cluster0.voqek12.mongodb.net/lost?retryWrites=true&w=majority"
    )
    .then(() => console.log("Mongo Connected!"))
    .catch((err) => {
      console.log("MongoErro:", err.code);

      
    });
}

module.exports = dbConnect;
