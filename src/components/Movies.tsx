import styled from "styled-components";
import { Movie } from "../shared/Interface";

interface props {
  data?: Movie[];
  openModal: (e: Movie, i: number) => void;
}

function Movies({ data, openModal }: props) {
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
          <p>{e.Title}</p>
        </MovieBox>
      ))}
    </div>
  );
}

//Get img props to display
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
  p {
    font-size: 2vw;
    color: #e6e6e6;
    margin: 8px;
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
