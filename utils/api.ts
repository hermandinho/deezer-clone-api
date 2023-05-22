// import fetch from "node-fetch";
import axios from "axios";

const API_URL = "https://api.deezer.com";

export const fetchTracks = async (q: string) => {
  return axios.get(`${API_URL}/search?q=${q}`);
};

export const getArtistById = async (id: number) => {
  return axios.get(`${API_URL}/artist/${id}`);
};

export const fetchArtistTopTracks = async (id: number, limit = 5) => {
  return axios.get(`${API_URL}/artist/${id}/top?limit=${limit}`);
};

export const fetchArtistAlbums = async (id: number) => {
  return axios.get(`${API_URL}/artist/${id}/albums`);
};
