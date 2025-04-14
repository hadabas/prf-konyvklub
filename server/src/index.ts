import express from 'express';
/*
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession  from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
*/

const app = express();
const port = 5000;

app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});

console.log('After server is ready.');