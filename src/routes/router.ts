import express from 'express';
import controller from '../controller/bookcontroller';
import userController from '../controller/usercontroller';
import verifyToken from '../middleware/verifyToken';

let router = express.Router();

router.get('/', function(req, res){
    res.sendFile(__dirname + '/public/app/views/index.html');
  });

//Library controller routes for books
router.post('/addBook', controller.addBook);
router.get('/getBook',controller.getBook)
router.delete('/removeBook',controller.removeBook)
router.put('/updateBook',controller.updateBook)
router.get('/getAllBooks',controller.getAllBooks)

//User controller routes with jwt tokens
router.post('/register', userController.register);
router.get('/user', verifyToken, userController.verifyUser);
router.post('/login', userController.login);
router.get('/logout', userController.logout);


export default router;


