
const influence_score = (user.follower_count * weight_follower_count) + (user.interaction_rate * weight_interaction_rate) + (user.reputation_score * weight_reputation_score)



export default influence_score;