const jwt =require('jsonwebtoken')
const bcrypt=require('bcryptjs')


module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define('User',{
        name:{
            type:DataTypes.STRING,
            
        },
        email:{
            type:DataTypes.STRING,
            defaultValue:'test@g.com',
        },
         password:{
            type:DataTypes.STRING
          
        },
        gender:{
            type:DataTypes.STRING
        },        
        dob:{
            type:DataTypes.DATE
        },
        token:
        {
            type:DataTypes.STRING
        },
        // tokens:[{
        //     token:{
        //         type:DataTypes.STRING
        //     }
        // }]
    })

    User.prototype.generateAuthToken=async function()
    {
        const user =this

        const token = jwt.sign({id:user.id},'thisisnodedemo')
        //user.tokens=user.tokens.concat({token})
        
        await User.update({token:token},{  where:{ id:user.id } })
        //user.save()
        return token
    }

    User.findByCredentials=async(email,password)=>{
       // console.log("here")
        const user = await User.findOne({ where: { email: email } })
        console.log("user 1",user)
        if(!user)
        {
            throw new Error('Unable to Login')
        }
        const isMatch= await bcrypt.compare(password,user.password)
       // console.log("user 3",isMatch)

        if(!isMatch)
        {
            throw new Error('Wrong Password')
        }
 //       console.log("user 2",user)

        return user
    }


return User
}