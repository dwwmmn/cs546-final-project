// const passport = require("passport");
const LocalStrategy = require("passport-mongodb").Strategy;
const bcrypt = require("bcryptjs");
const withDB = require("../db/mongoSyncSetup.js");

let setupLocalStrategy = (passport) => {
    passport.use(new LocalStrategy({
            // TODO ?
        },
        (username, password, done) => {
            withDB((err, db) => {
                if (err)
                    return done(null, false, { message: "Internal error" }); // TODO
                db.collection("users").findOne({ username: username }, 
                    (err, user) => {
                        if (!user) {
                            return done(null, false, { message: "Incorrect username" });
                        }

                        bcrypt.compare(password, user.hashedPassword, (err, isValid) => {
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
        
    passport.serializeUser((user, callback) => {
        callback(null, user.id);
    });

    passport.deserializeUser((id, callback) => {
        withDB((err, db) => {
            db.collection("users").findOne({_id: id}, (err, item) => {
                callback(err, item);
            });
        });
    });
};

module.exports.setupLocalStrategy = setupLocalStrategy;
