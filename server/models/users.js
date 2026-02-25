const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UsersSchema = new schema({
       firstname:{
          type:String,
          require:true
       },
       lastname:{
            type:String,
            require:true
       },
       email:{
          type:String,
          require:true

       }, 
       telephone:{
          type:String
       },
        address:{
           type:String
       },
       city:{
          type:String
       },
        postalcode:{
           type:String
       },
       country:{
            type:String
       },
        state:{
           type:String
       },
       Note:{
          type:String
       },
      
       password:{
          type:String
       }
})

module.exports = mongoose.model("user",UsersSchema);