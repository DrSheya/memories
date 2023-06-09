import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRouter from './routes/posts.js';
import userRouter from './routes/user.js';


const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRouter);
app.use('/user', userRouter);

// https://mongodb/database/atlas


const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {console.log(`Server Running on Port: http://localhost:${PORT}`)}))
    .catch((error) => console.log(`${error} did not connect`));

   // is no longer state of the art  mongoose.set('useFindAndModify', false);