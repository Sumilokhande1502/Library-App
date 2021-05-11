import express from 'express';
import controller from '../controller/api';
import authController from '../controller/authcontroller';


let router = express.Router();

router.post('/addBook', controller.addBook);
router.get('/getBook',controller.getBook)
router.delete('/removeBook',controller.removeBook)
router.put('/updateBook',controller.updateBook)
router.get('/getAllBook',controller.getAllBook)

router.post('/register', authController.register);
router.get('/admin', authController.getAdminId);


export default router;


