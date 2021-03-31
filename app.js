const express=require('express')
const app=express()
require('./models')
app.use(express.json())
const PORT=3000
const multer=require('multer')
const userctrl=require('./controllers/userController')
const storyCtrl=require('./controllers/storyController')
const auth=require('./middleware/auth')


//posts image
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'imageFolder')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage})



//router
app.post('/user',userctrl.createUser)
app.post('/user/login',userctrl.loginUser)
app.get('/user/me',auth,userctrl.readUser)
app.post('/user/logout',auth,userctrl.logoutUser)
app.post('/user/name',auth,userctrl.singleUser)
app.patch('/user/update',auth,userctrl.updateUser)

app.post('/send-request',auth,userctrl.sendFriendRequest)
app.post('/cancel-request',auth,userctrl.cancelFriendRequest)
app.get('/my-request',auth,userctrl.myFriendRequest)
app.post('/request-status',auth,userctrl.friendRequestStatus)
app.get('/my-frinds',auth,userctrl.showAllfriendList)

app.post('/story/comment',auth,storyCtrl.commentPost)
app.post('/story/like',auth,storyCtrl.likePost)
app.post('/story/unlike',auth,storyCtrl.dislikePost)

app.post('/story/image',auth,upload.single('uploadImage'),storyCtrl.addStory)

app.post('/story/readcomment',auth,storyCtrl.readComment)


app.listen(PORT,()=>{
    console.log("app is Listening on port "+PORT+"!!")
})