const mongooes = require('mongoose');

const menuSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredient: {
        type: [String],
        default: []
    },
    salase_Number: {
        type: Number,
        default: []
    }
})



const Menu = mongooes.model('Menu', menuSchema);

module.exports = Menu;