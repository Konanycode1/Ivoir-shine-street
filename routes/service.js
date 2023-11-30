import express from 'express';
import Service from '../controller/service.js';
import { AUTH } from '../midlleware/auth.js';

const RouterService = express.Router();
RouterService.post('/service/create',AUTH, Service.insertService)
RouterService.put('/service/update', AUTH, Service.modificationService)
RouterService.delete('/service/delete', AUTH, Service.deleteService)
RouterService.post('/service/login',Service.loginService)
export default RouterService;