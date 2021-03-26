const {Sequelize,DataTypes}=require('sequelize')


const sequelize=new Sequelize('social-media','root','',{
    host:'localhost',
    dialect:'mysql',
    logging:false,
    pool:{max:5,min:0,idle:10000}
});

sequelize.authenticate()
.then(()=>{
    console.log("connected")
}).catch(error=>{
    console.log("Error "+error)
})


const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.sequelize.sync({force:false}).then(()=>{
    console.log("yes re-sync")
})
db.user=require('./user')(sequelize,DataTypes)
db.story=require('./story')(sequelize,DataTypes)
db.friendReq=require('./friendReq')(sequelize,DataTypes)
db.comment=require('./comment')(sequelize,DataTypes)
db.like=require('./like')(sequelize,DataTypes)

module.exports=db