const postModel = require('../models/postModel.js');
const mongoose = require('mongoose');
const cloudinary = require('../utils/cloudinaryConfig');

exports.addPost = async (req, res) => {
  console.log(req.file);
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    const newPost = await postModel.create({
      ...req.body,
      image: image.secure_url,
      cloudinary_id: image.public_id,
    });
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.editPost = async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await postModel.find({ _id: req.params.id });
    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'Post not found',
      });
    }
    console.log(post[0]);
    const updatedPost = await postModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    console.log(updatedPost);
    res.status(200).json({
      status: 'success',
      data: {
        post: updatedPost,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.getUserposts = async (req, res) => {
  try {
    const posts = await postModel.find({ user: req.params.id });
    if (!posts) {
      return res.status(404).json({
        status: 'fail',
        message: 'No posts found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
