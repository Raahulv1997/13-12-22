import express from 'express';

import bodyParser from 'body-parser'

import { deleteUser, getAllUser, getUserById, saveUser, searchAPI, selectAPI, updateUser } from '../Controllers/UserController.js';
import multer from "multer";
import path from 'path'

import {fileURLToPath} from 'url'
 const app=express();
app.use(express.static('images'))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
 const userRouter= express.Router();




 const __filename=fileURLToPath(import.meta.url);
 const __dirname= path.dirname(__filename);

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {  
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  var upload = multer({
    storage: storage
    // dest:'./public/catgory_images'
  })
   




  // const imageStorage = multer.diskStorage({
  
  //   destination: './public/bulk_upload_xls', // Destination to store image 
    
  //   filename: (req, file, cb) => {
  //       cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  //       // file.fieldname is name of the field (image), path.extname get the uploaded file extension
  //   }
  // });
  
  // const imageUpload = multer({
  //   storage: imageStorage,
  //   limits: {
  //       fileSize: 1000000   // 1000000 Bytes = 1 MB
  //   }
  // })



 userRouter.post('/user',upload.single('userimage'), saveUser)
// userRouter.post('/user', saveUser)
 userRouter.get('/user', getAllUser)
 userRouter.get('/user/:id', getUserById);
 userRouter.delete('/user/:id', deleteUser);
 userRouter.put('/user/:id',upload.single('userimage'), updateUser);
 userRouter.get('/search', searchAPI);
 userRouter.get('/select/:key', selectAPI);

 export default userRouter;