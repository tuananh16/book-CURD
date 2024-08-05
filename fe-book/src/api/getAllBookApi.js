import axiosClient from "./axiosClient";

const getAllBookApi = {
  getAll: () => {
    return axiosClient.get("book");
  },
};

export default getAllBookApi;
