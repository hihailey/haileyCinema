import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { getMovieData, getMovieById } from "./APIActions";
import Modal from "./components/Modal";
import moment from "moment";
import styled from "styled-components";
import { Movie, MovieData, MovieList } from "./shared/Interface";
import Pagination from "./components/Pagination";

function App() {
  const [movies, setMovies] = useState<MovieList>();
  const [isOpen, setIsOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState<MovieData>();
  const [time, setTime] = useState<Number>(0);
  const [movieId, setMovieId] = useState(0);
  const [loader, setLoader] = useState(false);

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
  const openModal = () => {
    setIsOpen(true);
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
    <>
      <div>
        <>The use of app :{time} seconds </>
        <MainBox>
          <h1>
            Welcome to Hailey's Cinema
            <span aria-label="movie">🎥</span>
          </h1>
          <p>
            Let's search the movie title!<span aria-label="hand">👋</span>
          </p>
          <input
            onChange={(e) => {
              getMovieName(e);
            }}
            placeholder={"Search.."}
          />
          <p>{movies?.Response && <>{movies?.Error}</>}</p>
        </MainBox>

        <MovieBox>
          {movies?.Search?.map((e: Movie, i: number) => (
            <div
              onClick={() => {
                openModal();
                getMovieInfo(e.imdbID);
                setMovieId(i);
              }}
              key={i}
            >
              <li>{e.Title}</li>
            </div>
          ))}
        </MovieBox>

        <Pagination data={movies} />

        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          data={movieInfo}
          prev={prevMovie}
          next={nextMovie}
          loader={loader}
        />
      </div>
    </>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 20vw;
    padding: 8px;
    border-radius: 8px;
  }
`;

const MovieBox = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 12px;
  div {
    width: 100%;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    &:hover {
      background-color: #c5e5f6;
    }
  }
`;

export default App;
