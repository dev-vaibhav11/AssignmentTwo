

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
            type:Datatypes.INTEGER,
            defaultValue: 0
        },
        commentCount:
        {
            type:Datatypes.INTEGER,
            defaultValue: 0
        }
        
    })
    return Story
}