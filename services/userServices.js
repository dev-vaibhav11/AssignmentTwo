const { Sequelize,Op,QueryTypes } = require('sequelize')
const db=require('../models')
const User=db.user
const FriendRequest=db.friendReq


//create user
const createUser =async(data)=>{
    try
    {
        const user=await User.create(data)
        return user;
    }
    catch(e)
    {
        throw Error("Error "+e)
    }    
}

const findUser=async(name)=>{
    const users=await User.findAll({
        where:{
            name:{
                [Op.like]:name+"%"
            }
        }
    })
    return users
}

const updateUser=async(body,_id)=>{

    try{
    const data={
            name:body.name,
            email:body.email,
            dob:body.dob,
            gender:body.gender
        }

        const user=await User.update(data,{
            where:{ id:_id }
        })
        return user;
    }catch(e){
        throw Error("Error "+e)
    }
}

const sendFriendRequest=async(senderId,receiverId)=>{
    try{
        const friend=await FriendRequest.create({sender_id:senderId,receiver_id:receiverId})
        return friend;
    }catch(e)
    {
        throw Error("Error "+e)
    }
}

const cancelFriendRequest=async(senderId,receiverId)=>{
    
    try{
    const friend=FriendRequest.findOneAndRemove({sender_id:senderId,receiver_id:receiverId})
    return friend;
    }catch(e)
    {
        throw Error("Error "+e)
    }
}

const myFriendRequest=async(_id)=>{
    const data = await db.sequelize.query(
        `SELECT user.name, user.id 
         FROM users as user,frindrequests as frnd
         WHERE user.id=frnd.sender_id 
         AND frnd.status= 0
         AND frnd.receiver_id = ?`,
        {
            type:QueryTypes.SELECT,
            replacements:[_id]
        })   
        return data;
}


module.exports={
    createUser,
    findUser,
    updateUser,
    sendFriendRequest,
    cancelFriendRequest,
    myFriendRequest
}