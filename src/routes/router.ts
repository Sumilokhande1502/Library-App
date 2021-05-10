import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
import express from 'express';
import controller from '../controller/api';

let router = express.Router();

router.post('/addBook', controller.addBook);
router.get('/getBook',controller.getBook)
router.delete('/removeBook',controller.removeBook)
router.put('/updateBook',controller.updateBook)

export default router;

