import axios from 'axios';

const apiReviewsUrl = 'http://localhost:8080/api/reviews';

const getReviews = async (productId) => {
  const response = await axios.get(`${apiReviewsUrl}?productId=${productId}`);
  return response.data;
};

const getReviewsByCustomer = async (consumerId) => {
  const response = await axios.get(`${apiReviewsUrl}?userId=${consumerId}`);
  return response.data;
}

const createReview = async (newReview) => {
  const response = await axios.post(apiReviewsUrl, newReview);
  return response.data;
};

export { getReviews, getReviewsByConsumer ,createReview };