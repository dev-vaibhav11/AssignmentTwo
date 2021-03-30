const { Sequelize,Op,QueryTypes } = require('sequelize')
const db=require('../models')
const User=db.user


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

module.exports={
    createUser
}