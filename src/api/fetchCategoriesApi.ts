import axios from "axios";
import { CATEGORIES_ENDPOINT } from "../constants/apiConstants";

export const fetchCategoriesAPI = async () => {
  const response = await axios.get(CATEGORIES_ENDPOINT);
  return response.data;
};
