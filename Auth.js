
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const person = require('./models/person');

passport.use(new localStrategy(async (USERNAME, PASSWOED, done) => {
    try {
        //console.log('Received credentials:', USERNAME, PASSWOED);
        const user = await person.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: 'Invalid username' });
        const pass = await user.comparepasswors(PASSWOED);
        if (pass) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'Invalid password' });
        }

    } catch (error) {
        return done(error);

    }
}));

module.exports = passport;