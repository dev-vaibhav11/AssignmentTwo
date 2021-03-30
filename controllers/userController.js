const { Sequelize,Op,QueryTypes } = require('sequelize')
const db=require('../models')
const User=db.user
const FriendRequest=db.friendReq
const bcrypt =require('bcryptjs')
const UserService=require('../services/userServices')

//create user
const createUser =async(req,res)=>{
    //console.log(req.body)
    try
    {
        req.body.password= await bcrypt.hash(req.body.password,8)
     //    console.log(req.body.password)
        const user=await UserService.createUser(req.body)
       // console.log(user)
        const token= await user.generateAuthToken()
        //console.log(token)
       
        res.status(201).send({'token':token})
    }
    catch(e)
    {
        res.status(400).send(e)
    }
    
}


//login user
const loginUser=async(req,res)=>{

    try{
      // console.log(req.body.email,req.body.password)
        const user=await User.findByCredentials(req.body.email,req.body.password)
        //const token=await user.generateAuthToken()
       //console.log(user)
        res.status(200).json({"token":user.token})

    }catch(e){
        res.status(400).send(e)
    }
}

//logout user
const logoutUser=async(req,res)=>{
    try
    {
        res.status(200).json({"success":"logout successfully"})
    }
    catch(e)
    {
        res.status(400).send(e)
    }
}

//read user
const readUser=async(req,res)=>{

    res.send(req.user)
}

//get users
const singleUser=async(req,res)=>{

try{
const users=await UserService.findUser(req.body.name)
if(!users)
    {
         //throw new Error("")
        return res.status(404).send("No user found !!!") 
    }
    res.status(200).send(users)
}catch(e){
    res.status(500).send()
    }
}

//update user
const updateUser=async(req,res)=>{
    try
    {
        
        const user=await UserService.updateUser(req.body,req.user.id)
        
        res.status(200).json(user)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
}


//send friend request
const sendFriendRequest=async(req,res)=>{
    const senderId=req.user.id
    const receiverId=req.body.id
    try{
       // console.log({sender_id:senderId,receiver_id:receiverId})
        const friend=await UserService.sendFriendRequest(senderId,receiverId)
         res.status(200).send(friend)
    }catch(e){
        res.status(500).send()
    }
}

//cancel friend request
const cancelFriendRequest=async(req,res)=>{
    const senderId=req.user.id
    const receiverId=req.body.id
      
    try{
        const friend=await UserService.cancelFriendRequest(senderId,receiverId)
         res.status(200).send(friend)
    }catch(e){
        res.status(400).send()
    }
}

//my incoming frnd request
const myFriendRequest=async(req,res)=>{
    
    try
    {
        const data = await db.sequelize.query(
            `SELECT user.name, user.id 
             FROM users as user,frindrequests as frnd
             WHERE user.id=frnd.sender_id 
             AND fr.status= 0
             AND fr.receiver_id = ?`,
            {
                type:QueryTypes.SELECT,
                replacements:[req.user.id]
            })
        res.status(200).json(data)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
}

//accept or reject friend request
const friendRequestStatus=async(req,res)=>{
    //0=arrive
    //1=accept
    //2=reject
    const sender_id=req.body.id
    const receiver_id=req.user.id
    const status=req.body.status
    
    //console.log(sender_id+"--"+receiver_id+"--"+status)
    let reqStatus
    try{
        if(status === 1)
        {
            reqStatus=await FriendRequest.update({status : 1},{
                where:{ sender_id:req.body.id,receiver_id:req.user.id  }
            })
        }
        if(status === 2)
        {
            reqStatus = FriendRequest.destroy({where:{ sender_id:req.body.id,receiver_id:req.user.id }})
        }
        res.status(200).send(reqStatus)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
}

//show all friend list
const showAllfriendList=async(req,res)=>{
    try
    {
        const data = await db.sequelize.query(
            `SELECT user.name, user.id 
             FROM users as user,frindrequests as frnd
             WHERE user.id=frnd.sender_id 
             AND fr.status= 1
             AND fr.receiver_id = ?`,
            {
                type:QueryTypes.SELECT,
                replacements:[req.user.id]
            })
        res.status(200).json(data)
       res.send(allFriendList)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
}


module.exports={
    createUser,
    loginUser,
    readUser,
    logoutUser,
    singleUser,
    updateUser,
    sendFriendRequest,
    cancelFriendRequest,
    myFriendRequest,
    friendRequestStatus,
    showAllfriendList   
}