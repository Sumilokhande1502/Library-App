import express from 'express';
import controller from '../controller/api';
import userController from '../controller/usercontroller';
import verifyToken from '../middleware/verifyToken';


let router = express.Router();

//Library controller routes for books
router.post('/addBook', controller.addBook);
router.get('/getBook',controller.getBook)
router.delete('/removeBook',controller.removeBook)
router.put('/updateBook',verifyToken,controller.updateBook)
router.get('/getAllBook',controller.getAllBooks)

//User controller routes with jwt tokens
router.post('/register', userController.register);
router.get('/user', verifyToken, userController.verifyUser);
router.post('/login', userController.login);
router.get('/logout', userController.logout);


export default router;


