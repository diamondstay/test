import axiosClient from './axiosClient';

const userApi = {
  getAllUser: params => {
    const url = '/users';
    return axiosClient.get(url, { params });
  },
  deleteUserById: id => {
    const url = `users/${id}`;
    return axiosClient.delete(url);
  },
  updateUserById: (id, data) => {
    const url = `users/${id}`;
    return axiosClient.put(url, data);
  },
  addOneUser: data => {
    const url = '/users';
    return axiosClient.post(url, data);
  },
};

export default userApi;
