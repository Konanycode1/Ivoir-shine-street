import express from 'express';
import Declaration from '../controller/declaration.js';

const RouterDecla = express.Router();
RouterDecla.post('/declaration/create',Declaration.create)

export default RouterDecla;