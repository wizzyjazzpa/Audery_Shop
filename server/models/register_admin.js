const mongoose = require('mongoose');
const schema = mongoose.Schema;

const RegSchema = new schema({
     username:{
         type:String,
         require:true

     },
     password:{
         type: String,
         require:true
     }
})

module.exports =mongoose.model("Admin",RegSchema)