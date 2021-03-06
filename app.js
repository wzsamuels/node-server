
import express from 'express';
import path, { dirname } from 'path';
//import * as path from 'path'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import fs from 'fs';

import blogRouter from './routes/blog-api.js'
import bookRouter from './routes/book-api.js'
import cors from 'cors'
import './db/blog.js'
//import './db/bookminster.js'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config( {path: './.env'});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//app.use(logger('dev'));
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
//app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../portfolio/build')));
app.use(express.static(path.join(__dirname, '../mcd/build')));
app.use(express.static('/home/ubuntu/web'));

app.use('/api/book', bookRouter);
app.use('/api/blog', blogRouter);

app.get('/sub', (req, res, next) => {
  res.sendFile(path.join('/home/ubuntu/web', 'index.html'));
});

app.get('/mcd', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../mcd/build', 'index.html'));
});

app.get('/*', (req, res, next) => {
  res.sendFile(path.join('/home/ubuntu/portfolio/build', 'index.html'));
});


app.use(function (req, res, next) {
  res.sendFile(__dirname + '/public/404.html');
});

export default app;
