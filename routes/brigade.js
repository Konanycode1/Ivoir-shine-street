import express from 'express';
import Brigade from '../controller/brigade.js';
import { AUTH } from '../midlleware/auth.js';
import multer from '../midlleware/multer.js';


const RouterBrigade = express.Router();
RouterBrigade.post('/brigade/create',multer.single('image'),AUTH, Brigade.create);
RouterBrigade.post('/brigade/login', Brigade.login);
RouterBrigade.post('/brigade/update/:id',AUTH, Brigade.update);
RouterBrigade.post('/brigade/delete',AUTH, Brigade.delete);

export default RouterBrigade;