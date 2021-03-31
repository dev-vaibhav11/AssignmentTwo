
module.exports=(sequelize,Datatypes)=>{

    const Like=sequelize.define('Like',{
        like:
        {
            type:Datatypes.BOOLEAN,
            defaultValue: 1
        },
        story_id:
        {
            type:Datatypes.INTEGER
        }
        ,
        user_id:
        {
            type:Datatypes.INTEGER
        }
        
    })
    return Like
}