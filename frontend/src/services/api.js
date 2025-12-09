import axios from 'axios';

// Connect to our running Spring Boot Backend
const API_URL = 'http://localhost:8080/api/documents';

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const getDocuments = async () => {
  return axios.get(API_URL);
};

export const deleteDocument = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getDownloadUrl = (id) => {
  return `${API_URL}/${id}`;
};