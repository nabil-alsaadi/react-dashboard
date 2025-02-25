import axios from "axios";
import { PRODUCTS_ENDPOINT, PRODUCTS_SEARCH_ENDPOINT, PRODUCTS_CATEGORY_ENDPOINT } from "../constants/apiConstants";

interface FetchProductsParams {
  page: number;
  pageSize: number;
  filter?: { key: string; value: string };
}

export const fetchProductsAPI = async ({ page, pageSize, filter }: FetchProductsParams) => {
  const params: Record<string, string | number> = {
    limit: pageSize,
    skip: (page - 1) * pageSize,
  };

  let url = PRODUCTS_ENDPOINT;

  if (filter) {
    const encodedValue = filter.value

    if (filter.key === "category") {
      url = `${PRODUCTS_CATEGORY_ENDPOINT}/${encodedValue}`;
    } else {
      url = PRODUCTS_SEARCH_ENDPOINT;
      params.q = encodedValue;
    }
  }

  const response = await axios.get(url, { params });

  return {
    products: response.data.products,
    total: response.data.total || response.data.products.length,
  };
};
