import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { getMovieData, getMovieById } from "./APIActions";
import Modal from "./components/Modal";
import moment from "moment";
import { Movie, MovieData, MovieList } from "./shared/Interface";
import Movies from "./Movies";

function App() {
  const [movies, setMovies] = useState<MovieList>();
  const [isOpen, setIsOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState<MovieData>();
  const [time, setTime] = useState<Number>(0);
  const [movieId, setMovieId] = useState(0);
  const [loader, setLoader] = useState(false);
  const [firstMovies, setFirstMovies] = useState<Movie[]>();
  const [secondMovies, setSecondMovies] = useState<Movie[]>();

  //Set login time
  useEffect(() => {
    const loginTime = moment().format();
    sessionStorage.setItem("login", loginTime);
  }, []);

  //Set login duration
  useEffect(() => {
    setTimeout(() => setTime(getTime), 1000);
  }, [time]);

  //Get login duration
  const getTime = () => {
    const currentTime = moment();
    const loginTime = sessionStorage.getItem("login");
    const diff = currentTime.diff(loginTime, "seconds");
    return diff;
  };

  //Get movies list with title
  const getMovieName = async (e: React.FormEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    //Get & Set api data
    const data = await getMovieData(title);
    setMovies(data);
    //Custom error msg when user type nothing
    if (!title) {
      setMovies({ ...data, Error: "Please type something!" });
    }
  };

  useEffect(() => {
    setMovieList();
    console.log(movies);
  }, [movies]);

  //Set movies for the left and right box
  const setMovieList = () => {
    let first = [];
    let second = [];
    if (movies?.Search && movies.Search.length > 0) {
      const movieData = movies.Search;

      let firstRow = Math.ceil(movieData.length / 2);
      let secondRow = movieData.length - firstRow;

      for (let i = 0; i < firstRow; i++) {
        first.push(movieData[i]);
      }
      if (movieData.length > 1)
        for (let j = secondRow; j < movieData.length; j++) {
          second.push(movieData[j]);
        }
    }
    setFirstMovies(first);
    setSecondMovies(second);
    console.log(first, second);
  };

  //Get movie info with movie id
  const getMovieInfo = async (id: any) => {
    //Set Loader till bring the data
    setLoader(true);
    try {
      const data = await getMovieById(id);
      setLoader(false);
      setMovieInfo(data);
    } catch (e) {
      setLoader(false);
    }
  };

  //Open Modal, send movie id
  const openModal = (e: Movie, i: number) => {
    setIsOpen(true);
    getMovieInfo(e.imdbID);
    setMovieId(i);
  };

  //Close Modal
  const closeModal = () => {
    setIsOpen(false);
  };

  const prevMovie = () => {
    let id = movies?.Search[movieId - 1]?.imdbID;
    if (id) {
      getMovieInfo(id);
      setMovieId(movieId - 1);
    }
  };

  const nextMovie = () => {
    let id = movies?.Search[movieId + 1]?.imdbID;
    if (id) {
      getMovieInfo(id);
      setMovieId(movieId + 1);
    }
  };

  return (
    <div className="main-wrapper">
      {/* <>The use of app :{time} seconds </> */}

      <Movies data={firstMovies} openModal={openModal} />

      <div className="main-box">
        <h1>CINEMA</h1>
        <p>FIND THE MOVIE YOU WANT</p>
        <input
          onChange={(e) => {
            getMovieName(e);
          }}
          placeholder={"Search.."}
        />
        <p>{movies?.Response && <>{movies?.Error}</>}</p>
      </div>

      <Movies data={secondMovies} openModal={openModal} />

      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        data={movieInfo}
        prev={prevMovie}
        next={nextMovie}
        loader={loader}
      />
    </div>
  );
}

export default App;
