
module.exports=(sequelize,Datatypes)=>{

    const Comment=sequelize.define('Comment',{
        comment:
        {
            type:Datatypes.STRING,
            allowNull: false
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
    return Comment
}