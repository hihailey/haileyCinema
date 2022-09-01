import axios from "axios";

export const getMovieData = async (title: string) => {
  const url = `http://www.omdbapi.com/?apikey=836daddd&s=${title}`;
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
  const url = `http://www.omdbapi.com/?apikey=836daddd&i=${id}`;
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
