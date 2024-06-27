require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const logger = require('./utils/logger');

const app = express();


app.use(express.json());

// MongoDB Connection
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  logger.info('MongoDB connected');
}).catch((err) => {
  logger.error(err);
});


const userRouter = require('./routes/authRoute');
const categoryRouter = require('./routes/categoryRoute');
const courseRouter = require('./routes/courseRoute');
const quizRouter = require('./routes/quizRoute');
const lessonRouter = require('./routes/lessonsRoute');
const reviewRouter = require('./routes/reviewRoute');


app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/course', courseRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/lesson', lessonRouter);
app.use('/api/review', reviewRouter);


app.listen(process.env.PORT || 4000, () => {
    logger.info(`Server started on port ${process.env.PORT || 4000}`);
  });
  
  