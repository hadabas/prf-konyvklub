import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession  from 'express-session';
import passport from 'passport';
import { configurePassport } from './passport/passport'
import mongoose from 'mongoose';
import cors from 'cors';
import { configureRoutes } from './routes/routes';

const app = express();
const port = 5000;

const dbUrl = 'mongodb+srv://hadabas:1Q2W3E4R@prf-konyvklub.jpq9rwd.mongodb.net/prf-konyvklub?retryWrites=true&w=majority&appName=prf-konyvklub';

// mongodb connection
mongoose.connect(dbUrl).then((_) => {
    console.log('Successfully connected to MongoDB.');
}).catch(error => {
    console.log(error);
    return;
});

// A CORS (cross origin manager) beállítása middlewareként.
const whitelist = ['http://localhost:4200'];
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void ) => {
        if(whitelist.indexOf(origin!) != -1) {
            callback(null,true);
        } else {
            callback(new Error('A CORS által a kérés megtagadva. (Nincs rajta az origin a fehérlistán.)'))
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

// Így semmilyen HTTP kérést nem fogad el a szerver, csak ha a whitelisten található források egyikéből jött.

//body parser: ez be van már építve az expressbe 4.16 felett, egyfajta request szűrést tesz lehetővé.
app.use(express.urlencoded({extended: true}));

//cookie parser: ha sütikkel szeretnél dolgozni, ez feltétlenül szükséges.
app.use(cookieParser());

// A req.session elérhető lesz, és a munkamenet kezelést és nyilvántartást valósítja meg a szerveren.
const sessionOptions: expressSession.SessionOptions = {
    secret: '{Valami$ecretKÓd14324A}*',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // fejlesztéshez false
        httpOnly: true,
        sameSite: 'lax'
      }
};
app.use(expressSession(sessionOptions));

//A passport a hitelesítésért felelő middleware. A sessionos részét is kérjük, mert használunk express-Sessiont, emiatt a sessionöket ő fogja kezelni.
app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/app', configureRoutes(passport, express.Router()));


app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});



console.log('After server is ready.');