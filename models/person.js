const mongooes = require('mongoose');
const Bcrypt = require('bcrypt');
const personSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) {
        return next();
    }

    try {
        const salt = await Bcrypt.genSalt(10);
        const hashedPassword = await Bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparepasswors = async function (candidatePassword) {
    try {
        const isMatch = await Bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {

    }
}
const Person = mongooes.model('Person', personSchema);

module.exports = Person;