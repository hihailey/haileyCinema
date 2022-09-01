import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getMovieData = async (title: string) => {
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`;
  try {
    const response = await axios.get(url);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getMovieById = async (id: string) => {
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`;
  try {
    const response = await axios.get(url);
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("error", error);
  }
};
