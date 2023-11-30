import express from 'express';
import cors from 'cors';
import {config} from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import RouteMinister from './routes/minister.js';
import RouterBrigade from './routes/brigade.js';
import RouterService from './routes/service.js';
import RouterDecla from './routes/declaration.js';

const Port = 1111;

const app = express();
config({
    path:path.join(process.cwd(),'.env')
})
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser());
app.use('/images',express.static(path.join(__dirname, 'images')));

app.use('/api',RouteMinister);
app.use('/api',RouterBrigade);
app.use('/api',RouterService);
app.use('/api',RouterDecla);
connectDB()
.then(()=>{
    app.listen(Port,()=>{
        console.log("server run !!!")
    })
})
.catch((e)=>{
    console.log("server ERROR:",e.message)
})