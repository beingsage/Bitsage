// import engagement_score from "../calculators/engagement_score";
// import influence_score from "../calculators/influence_score";
// import recency_score from "../calculators/recency_score";
// import sentiment_score from "../calculators/sentiment_score";
// import trend_score from "../calculators/trend_score";


import express from 'express';
import Bit from '../models/Bits.model.js';
import { mongo } from "mongoose";
const  router = express.Router();   

const processBits = async (req, res) => {
    try {
      // Destructure the request body
      const {
        title,
        description,
        images,
        link,
        date,
        source,
        author,
        tags,
        category,
        language,
        keywords,
        license,
        copyright,
        version,
        thumbnail,
        blog,
        publishedPaper,
        event,
        locations,
        conference,
        conferenceDate,
        likes,
        comments,
        shares,
        views,
        dislikes,
        favorites,
        bookmarks,
        ratings,
        reviews,
        feedback,
        reactions,
        timeSpent,
        totalWatchTime,
        repeatViews,
        totalEdits,
        versions,
        editQuality,
        followerCount,
        activeFollowers,
        dailyFollowers,
        weeklyFollowers,
        monthlyFollowers,
        yearlyFollowers,
        interactionRate,
        engagementRate,
        retentionRate,
        reputationScore,
      } = req.body;
  
      // Validate required fields (if any are mandatory)
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }
  
      // Create a new Bit document
      const newBit = new Bit({
        title,
        description,
        images,
        link,
        date,
        source,
        author,
        tags,
        category,
        language,
        keywords,
        license,
        copyright,
        version,
        thumbnail,
        blog,
        publishedPaper,
        event,
        locations,
        conference,
        conferenceDate,
        likes,
        comments,
        shares,
        views,
        dislikes,
        favorites,
        bookmarks,
        ratings,
        reviews,
        feedback,
        reactions,
        timeSpent,
        totalWatchTime,
        repeatViews,
        totalEdits,
        versions,
        editQuality,
        followerCount,
        activeFollowers,
        dailyFollowers,
        weeklyFollowers,
        monthlyFollowers,
        yearlyFollowers,
        interactionRate,
        engagementRate,
        retentionRate,
        reputationScore,
      });
  
      // Save the document to the database
      const savedBit = await newBit.save();
  
      // Respond with the saved document
      res.status(201).json(savedBit);
    } catch (error) {
      console.error('Error saving Bit:', error);
      res.status(500).json({ error: 'Failed to save Bit' });
    }
  };
  
  
const updateBits = (req, res) => {
    const  bits = req.body;
    res.json({  bits });
}



const updateMins = (req, res) => {
    const  bits = req.body;
    res.json({  bits });
   
}

const updateHours = (req, res) => {
    const  bits = req.body;
    res.json({  bits });

}

const updateDays = (req, res) => {
    const  bits = req.body;
    res.json({  bits });

}  




export {processBits,updateBits, updateMins, updateHours, updateDays};