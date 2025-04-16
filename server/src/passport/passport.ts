import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local'
import { User } from '../model/User';

export const configurePassport = (passport: PassportStatic): PassportStatic => {

    passport.serializeUser((user: Express.User, done) => {
        console.log('user is serialized.');
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        console.log('user is deserialized.');
        done(null, user);
    });

    passport.use('local', new Strategy((username, password, done) => {
        const query = User.findOne({ username: username });
        query.then(user => {
            if (user) {
                user.comparePassword(password, (error, isMatch) => {
                    if (error) {
                        done('Incorrect username or password.');
                    } else {
                        if(isMatch) {
                            done(null, user.username);
                        } else {
                            console.log("Nem jó a két jelszó, a compare password hibát dob.")
                            done(null,undefined);
                        }
                    }
                });
            } else {
                done(null, undefined);
            }
        }).catch(error => {
            done(error);
        })
    }));

    return passport;
}