const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
     category:{
         type:String,
         require:true
     },
    Name:{
        type: String,
        require:true
    },
    price:{
         type:String,
         require:true
    },
    sizes: {
        type: [String],
        default: []
    },
    quantity:{
         type:String,
         require:true
    },
    color:{
        type:[String],
        default:[],
    },
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    status:{
         type :String,
         default:"New"
    },

    createdAt: {
        type: String,
        default: () =>
            new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })
    }
})


module.exports = mongoose.model("product", productSchema)