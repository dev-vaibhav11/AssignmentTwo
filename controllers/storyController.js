const { Sequelize,Op } = require('sequelize')
const db=require('../models')
const Story=db.story
const Like=db.like
const Comment=db.comment
const multer=require('multer')

  
//post image
const addStory=async(req,res)=>{

try{
   //  const path= 'src/imageFolder/'+req.file.originalname
     // const path= '/img/d2.jpg'
     const post= new Story({
     "image":'imageFolder/'+req.file.originalname,
     "description":req.body.description,
     "user_id":req.user._id
     })
     const post1=await post.save()
     res.send(post1)
    
 }
    catch(e)
    {
        res.status(400).send(e)
    }
}

//comment------------
const commentPost= async(req,res)=>{
  try
  {
      const data=({
          "user_id":req.user.id,
          "story_id":req.body.story_id,
          "comment":req.body.comment
      })
      const comment=await Comment.create(data)
      
      await Story.update( { commentCount: Sequelize.literal('commentCount + 1') }, //what going to be updated
      { where: { id:req.body.story_id }} // where clause)  
      )

      res.status(200).send(comment)
  }
  catch(e)
  {
      res.status(400).send(e)
  }
}

//like-----
const likePost= async(req,res)=>{
  try
  {
      const data={
              "user_id":req.user.id,
              "story_id":req.body.story_id,
          }
          const like=await Like.create(data)
  
    await Story.update( { likeCount: Sequelize.literal('likeCount + 1') }, //what going to be updated
    { where: { id:req.body.story_id }})
  
    res.status(200).send(like)

  }
  catch(e)
  {
      res.status(400).send(e)
  }
}

//dislike-------------
const dislikePost= async(req,res)=>{
  try
  {
      await Like.destroy({where:{ user_id:req.user.id,story_id:req.body.story_id }})
      res.status(200).send()
 
      await Story.update( { likeCount: Sequelize.literal('likeCount - 1') }, //what going to be updated
      { where: { id:req.body.story_id }})
   
    }
  catch(e)
  {
      res.status(400).send(e)
  }
}
module.exports={
  addStory,
  commentPost,
  likePost,
  dislikePost
}