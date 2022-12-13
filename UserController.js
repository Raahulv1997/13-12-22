import {StatusCodes} from 'http-status-codes'
import { userSchema } from '../../validation/SchemaValidation.js';
import userModel from "../Models/UserSchema.js";


 export async function  saveUser( req, res){
   
     const  addimage=req.file.filename
   // console.log("addimage----------> "+addimage);
       try {
               req.body['dob']= new Date(req.body.dob)
                  const userEmail= await userModel.findOne({email:req.body.email})
                 if(userEmail){
                    res.status(StatusCodes.BAD_REQUEST).json({message:"Email already exist"}) 
                 }
                else{
                  let arr = [];
                      arr= req.body['hobbies']
                       let x = arr.split(',')
                       console.log("yyyyyyyyyyyyyyy-----------"+x)
                       req.body['hobbies'] = x;



                    const user= new  userModel({
                     name:req.body.name,
                     dob:req.body.dob,
                     city:req.body.city,
                     gender:req.body.gender,
                     email:req.body.email,
                     desc:req.body.desc,
                     mobile:req.body.mobile,
                     userimage:addimage,
                     hobbies:req.body.hobbies
                     })

                    console.log(user)
                    const SavedUser= await user.save();
                    res.status(StatusCodes.OK).json(SavedUser)
                 }
          
        }
      
    catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
      }
   }


 export async function getAllUser(req, res){
    try {
       const allUser= await userModel.find();
       res.status(StatusCodes.OK).json(allUser)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
    }
}
export async function getUserById(req, res){
  try {
     const userById= await userModel.findById(req.params.id);
     res.status(StatusCodes.OK).json(userById)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
  }
}

export async function deleteUser(req, res){
 try {
    await userModel.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({})
 } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
 }
}

export async function updateUser(req, res){
 try {
    const id= req.params.id
      const data=req.body;
      req.body['userimage']= req.file.filename
       console.log(data)
     const updateduser= await userModel.findByIdAndUpdate(id, data);
   
      console.log(updateduser)
     res.status(StatusCodes.OK).json(updateduser)

 } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
 }
}


export async function searchAPI(req, res){
   var searchBar;
   try {
      console.log(req.params.name)
      const username=req.query.name
      const usercity=req.query.city
      console.log(username,usercity)
      console.log("________________________chk_________________________")
      console.log(username)
      console.log(usercity)

      if(username!=undefined && usercity!=undefined){
         searchBar= await userModel.find({$and:[{city:{$regex:usercity},name:{$regex:username}}]});
   }else{
      searchBar= await userModel.find()
      

      }
    //var nn =  {$and:[{city:{$regex:usercity},name:{$regex:username}}
      res.status(StatusCodes.OK).json(searchBar)
   } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
   }
}


export async function selectAPI(req, res){
   try {
      const field= req.params.field;
      const key=req.params.key
      // console.log(field)
      console.log(key)
      const selectBar= await userModel.find({
        
      $or:[{name:{$regex:key}},{city:{$regex:key}},{hobbies:{$regex:key}},]
   });
      res.status(StatusCodes.OK).json(selectBar)
   } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
   }
}





