import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
import express from 'express';
import controller from '../controller/api';
import {createUserHandler} from '../controller/user.controller';
import validateRequest from '../middleware/validrequest';
import {createUserSchema} from '../middleware/user.schema';

let router = express.Router();

router.post('/addBook', controller.addBook);
router.get('/getBook',controller.getBook)
router.delete('/removeBook',controller.removeBook)
router.put('/updateBook',controller.updateBook)
router.get('/getAllBook',controller.getAllBook)

router.post('/admin', validateRequest(createUserSchema), createUserHandler);

export default router;


