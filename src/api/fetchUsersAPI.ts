import axios from "axios";
import { USERS_ENDPOINT, USERS_FILTER_ENDPOINT } from "../constants/apiConstants";

interface FetchUsersParams {
  page: number;
  pageSize: number;
  filter?: { key: string; value: string };
}

export const fetchUsersAPI = async ({ page, pageSize, filter }: FetchUsersParams) => {
  const baseUrl = filter ? USERS_FILTER_ENDPOINT : USERS_ENDPOINT;

  const params: Record<string, string | number> = {
    limit: pageSize,
    skip: (page - 1) * pageSize,
  };

  if (filter) {
    params.key = filter.key;
    params.value = filter.value;
  }

  const response = await axios.get(baseUrl, { params });

  if (!response.data.users) {
    throw new Error("No users found.");
  }

  return { users: response.data.users, total: response.data.total };
};
