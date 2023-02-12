const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect(
      "mongodb+srv://sd:sd@cluster0.9yqqtay.mongodb.net/studentportal"
    );
}

module.exports = connect