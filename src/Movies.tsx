import styled from "styled-components";
import { useState } from "react";
import { Movie } from "./shared/Interface";

interface props {
  id?: string;
  data?: Movie[];
  openModal: (e: Movie, i: number) => void;
  prev?: () => void;
  next?: () => void;
}

function Movies({ data, openModal, prev, next }: props) {
  const [movies, setMovies] = useState<Movie[]>();

  return (
    <div className="movies-container">
      {data?.map((e: Movie, i: number) => (
        <MovieBox
          className="movie-box"
          onClick={() => {
            openModal(e, i);
          }}
          key={i}
          img={e.Poster}
        >
          <ul>{e.Title}</ul>
        </MovieBox>
      ))}
    </div>
  );
}

const MovieBox = styled.div<{ img: string }>`
  background: ${(props) =>
    `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${props.img}) 
      `};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25vw;
  border-bottom: 0.5px solid black;
  cursor: pointer;
  ul {
    font-size: 2vw;
    color: #e6e6e6;
  }
  &:hover {
    background: ${(props) =>
      `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props.img}) 
      `};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
export default Movies;
