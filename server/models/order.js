const mongoose = require('mongoose');

const orderedItemSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            productName: String,
            productPrice: Number,
            size: Number,
            qty:Number,
            image: String
        }
    ],

    totalAmount: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('OrderedItem', orderedItemSchema);