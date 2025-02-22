import mongoose from 'mongoose';

const BitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  link: { type: String },
  date: { type: Date, default: Date.now },
  source: { type: String },
  author: { type: String },
  tags: [{ type: String }],
  reactions: [{
    love: Number,
    like: Number,
    wow: Number
}],
reviews: [{
    reviewer: String,
    comment: String,
    rating: Number
}],
ratings: {
    average: { type: Number, required: true },
    total: { type: Number, required: true }
},
  category: {
    type: String,
    enum: [
      "commit", "reel", "post", "paper", "event", "blog", "conference", 
      "location", "video", "image", "audio", "code", "dataset", 
      "project", "software", "tool", "website", "app", "Tech", "Science", "Arts"
    ],
    required: true,
  },
  language: {
    type: String,
    enum: ["EN", "FR", "ES"],
    required: true,
  },
  keywords: [{ type: String }],
  license: { type: String },
  copyright: { type: String },
  version: { type: String },
  thumbnail: { type: String },
  blog: { type: String },
  publishedPaper: { type: String },
  event: { type: String },
  locations: { type: [String], required: true },
  conference: { type: String },
  conferenceDate: { type: Date },

  // Engagement and metrics
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
  bookmarks: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
  reviews: [{ type: String }],
  feedback: [{ type: String }],
  reactions: [{ type: String }],
  timeSpent: { type: Number, default: 0 }, // In seconds
  totalWatchTime: { type: Number, default: 0 }, // In seconds
  repeatViews: { type: Number, default: 0 },

  // Timestamps and versioning
  timestamps: { type: Date, default: Date.now },
  totalEdits: { type: Number, default: 0 },
  versions: [{ type: String }],
  editQuality: [{ type: Number }], // Array of scores for edits

  // User and content stats
  followerCount: { type: Number, default: 0 },
  activeFollowers: { type: Number, default: 0 },
  dailyFollowers: { type: Number, default: 0 },
  weeklyFollowers: { type: Number, default: 0 },
  monthlyFollowers: { type: Number, default: 0 },
  yearlyFollowers: { type: Number, default: 0 },
  interactionRate: { type: Number, default: 0 },
  engagementRate: { type: Number, default: 0 },
  retentionRate: { type: Number, default: 0 },
  reputationScore: { type: Number, default: 0 },

  // Derived metrics (virtual fields or precomputed)
  engagementScore: { type: Number, default: 0 },
  recencyScore: { type: Number, default: 0 },
  influenceScore: { type: Number, default: 0 },
  sentimentScore: { type: Number, default: 0 },
  trendScore: { type: Number, default: 0 },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt
});

// Calculate derived fields
BitSchema.methods.calculateScores = function () {
  const weightLikes = 1.0;
  const weightComments = 2.0;
  const weightShares = 3.0;
  const weightViews = 0.5;
  const weightTimeSpent = 0.1;

  // Engagement Score
  this.engagementScore =
    (this.likes * weightLikes) +
    (this.comments * weightComments) +
    (this.shares * weightShares) +
    (this.views * weightViews) +
    (this.timeSpent * weightTimeSpent);

  // Recency Score
  const currentTime = Date.now();
  this.recencyScore = 1 / ((currentTime - this.timestamps) + 1);

  // Influence Score
  const weightFollowerCount = 1.5;
  const weightInteractionRate = 2.0;
  const weightReputationScore = 3.0;
  this.influenceScore =
    (this.followerCount * weightFollowerCount) +
    (this.interactionRate * weightInteractionRate) +
    (this.reputationScore * weightReputationScore);

  // Sentiment Score
  const weightPositive = 2.0;
  const weightNegative = -1.5;
  const positiveCommentsCount = this.comments; // Replace with actual sentiment analysis
  const negativeCommentsCount = 0; // Replace with actual sentiment analysis
  this.sentimentScore =
    (positiveCommentsCount * weightPositive) +
    (negativeCommentsCount * weightNegative);

  // Trend Score
  const pastInteractions = this.views + this.likes + this.comments;
  const currentInteractions = this.shares + this.dislikes + this.bookmarks;
  this.trendScore =
    (currentInteractions - pastInteractions) / Math.max(pastInteractions, 1);
};

// Export the model
const Bit = mongoose.model('Bit', BitSchema);

export default Bit;
