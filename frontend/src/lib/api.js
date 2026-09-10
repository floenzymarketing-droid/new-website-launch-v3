import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({ baseURL: API, timeout: 15000 });

export const getCatalog = () => client.get("/catalog").then((r) => r.data);
export const getReviews = () => client.get("/reviews").then((r) => r.data);
export const createReview = (payload) =>
  client.post("/reviews", payload).then((r) => r.data);
export const createOrder = (payload) =>
  client.post("/orders", payload).then((r) => r.data);
export const getWaterHardness = (postcode) =>
  client.get(`/water-hardness/${encodeURIComponent(postcode)}`).then((r) => r.data);
export const createSubscription = (payload) =>
  client.post("/subscriptions", payload).then((r) => r.data);

export default client;
