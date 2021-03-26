

module.exports=(sequelize,Datatypes)=>{

    const Story=sequelize.define('Story',{
        image:
        {
            type:Datatypes.STRING,
            allowNull: false
        },
        description:
        {
            type:Datatypes.STRING,
            allowNull: false,
            unique: true
        }
        ,
        user_id:
        {
            type:Datatypes.INTEGER
        },
        likeCount:
        {
            type:Datatypes.INTEGER
        },
        commentCount:
        {
            type:Datatypes.INTEGER
        }
        
    })
    return Story
}