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

    const data={
            name:body.name,
            email:body.email,
            dob:body.dob,
            gender:body.gender
        }

        const user=await User.update(data,{
            where:{ id:_id }
        })
        return user
}

module.exports={
    createUser,
    findUser,
    updateUser
}