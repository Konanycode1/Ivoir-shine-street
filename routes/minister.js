import express from 'express'
import Minister from '../controller/minister.js';
import {AUTH} from '../midlleware/auth.js'

const RouteMinister = express.Router();

RouteMinister.post('/minister/login',Minister.loginMiniter);
RouteMinister.post('/minister/create',Minister.create);
RouteMinister.get('/minister/',AUTH,Minister.getById);
export default RouteMinister