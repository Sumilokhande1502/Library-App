import express from 'express';
import controller from '../controller/api';
import {createUserHandler} from '../controller/user.controller';
import {createUserSessionHandler} from '../controller/session.controller';
import validateRequest from '../middleware/validrequest';
import {createUserSchema, createUserSessionSchema} from '../middleware/user.schema';

let router = express.Router();

router.post('/addBook', controller.addBook);
router.get('/getBook',controller.getBook)
router.delete('/removeBook',controller.removeBook)
router.put('/updateBook',controller.updateBook)
router.get('/getAllBook',controller.getAllBook)

//Register admin
router.post('/admin', validateRequest(createUserSchema), createUserHandler);

//Login
router.post('/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler);

export default router;


