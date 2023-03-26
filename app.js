const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');

const morgan = require('morgan');
const express = require('express');
const app = express();

app.use("/uploads", express.static("uploads"));
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

module.exports = app;
