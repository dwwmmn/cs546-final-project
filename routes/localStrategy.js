const passport = require("passport");
const LocalStrategy = require("passport-mongodb");

passport.use(new LocalStrategy({
        // TODO ?
    },
    (username, password, done) => {
        // TODO
    })
);
    
passport.serializeUser((user, callback) => {
    // TODO
});

passport.deserializeUser((id, callback) => {
    // TODO
});
