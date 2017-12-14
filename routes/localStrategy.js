// const passport = require("passport");
const CustomStrategy = require("passport-custom").Strategy;
const bcrypt = require("bcryptjs");
const withDB = require("../db/mongoSyncSetup.js");
const DEBUG = true;

let setupLocalStrategy = (passport) => {
    if (DEBUG) console.log("Creating local strategy");
    passport.use('login-strategy', new CustomStrategy(
        function (req, done) {
            withDB((err, db) => {
                if (err)
                    return done(null, false, { message: "Internal error" }); // TODO
                db.collection("users").findOne({ username: req.body.username }, 
                    (err, user) => {
                        if (!user) {
                            return done(null, false, { message: "Incorrect username" });
                        }

                        console.log(user);
                        console.log("user.password: " + user.password);

                        bcrypt.compare(req.body.password, user.password, (err, isValid) => {
                            if (!isValid) {
                                if (DEBUG) console.log("Incorrect password");
                                done(null, false, { message: 'Incorrect password.' });
                            } else {
                                if (DEBUG) console.log("Returning user '" + user.username + "'");
                                done(null, user);
                            }
                        });
                    }
                );
            });
        })
    );

    if (DEBUG) console.log("passport.serializeUser");
    passport.serializeUser((user, callback) => {
        callback(null, user._id);
    });

    if (DEBUG) console.log("passport.deserializeUser");
    passport.deserializeUser((id, callback) => {
        withDB((err, db) => {
            db.collection("users").findOne({_id: id}, (err, item) => {
                callback(err, item);
            });
        });
    });
};

module.exports = setupLocalStrategy;
