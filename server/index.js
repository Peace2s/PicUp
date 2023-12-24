
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import user from './models/user.js';
import PostMessage from './models/postMessage.js';


const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/myuser', async(req, res) => {
    try {
      const Users = await user.find({});
      res.send({status:"ok",data: Users});
    } catch (error) {
      console.log(error);
    }
});
app.post("/deleteUser", async (req, res) => {
  const { userId } = req.body;
  try {
    // Assuming your user model has a deleteOne method
    const result = await user.deleteOne({ _id: userId }).exec();
    
    // Check if the deletion was successful
    if (result.deletedCount === 1) {
      res.send({ status: "Ok", data: "Xóa thành công" });
    } else {
      res.status(404).send({ status: "Error", data: "Người dùng không tồn tại" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", data: "Lỗi server" });
  }
});

app.get('/mypost', async(req, res) => {
  try {
    const Users = await PostMessage.find({});
    res.send({status:"ok",data: Users});
  } catch (error) {
    console.log(error);
  }
});

app.post('/updateUser', async (req, res) => {
  try {
    const updatedUser = req.body.user;

    // Cập nhật người dùng
    const result = await user.updateOne(
      { _id: updatedUser._id },
      { $set: { name: updatedUser.name, email: updatedUser.email } }
    );

    res.send({ status: 'ok', data: "Người dùng đã được cập nhật thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Internal Server Error' });
  }
});



app.post('/deleteP', async (req, res) => {
  const { PostId } = req.body;
  try {
    const result = await PostMessage.deleteOne({ _id: PostId }).exec();
    if (result.deletedCount === 1) {
      console.log(`Post deleted: ${PostId}`);
      res.status(200).send({ status: "Ok", data: "Xóa thành công" });
    } else {
      console.log(`Post not found: ${PostId}`);
      res.status(200).send({ status: "Error", data: "Bài đăng không tồn tại" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send({ status: "Error", data: "Lỗi server" });
  }
});

const CONNECTION_URL = 'mongodb+srv://binhvodich77:Fl1ryIjdftp3SwU5@cluster1.tiovylo.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);