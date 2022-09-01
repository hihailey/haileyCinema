import { useEffect, useState } from "react";
import styled from "styled-components";
import { MovieData } from "../shared/Interface";
import { ButtonIcon, CloseIcon } from "./Icons";
import Loader from "./Loader";

interface props {
  id?: string;
  data?: MovieData;
  isOpen: boolean;
  loader: boolean;
  prev?: () => void;
  next?: () => void;
  closeModal: () => void;
}

//Modal Box
function Modal({ data, isOpen, loader, closeModal, prev, next }: props) {
  const [movieInfo, setMovieInfo] = useState<MovieData>();

  //Set movie data
  useEffect(() => {
    setMovieInfo(data);
  }, [data]);

  return (
    <ModalLayout
      className="modal-container"
      isOpen={isOpen}
      img={movieInfo?.Poster}
    >
      <div id="close-btn" onClick={() => closeModal()}>
        {CloseIcon}
      </div>
      <div className="modal-box">
        {loader ? (
          <>
            <Loader></Loader>
          </>
        ) : (
          <div>
            <div className="movie-info-box">
              <div className="movie-header">
                <div className="image-wrapper">
                  <button
                    onClick={prev}
                    style={{ transform: "rotate(180deg)" }}
                  >
                    {ButtonIcon}
                  </button>
                  <img alt={movieInfo?.Title} src={movieInfo?.Poster} />
                  <button onClick={next}>{ButtonIcon}</button>
                </div>

                <div className="content-box">
                  <h2>{movieInfo?.Title}</h2>
                  <p>
                    {movieInfo?.Year} ● {movieInfo?.Genre} ●{" "}
                    {movieInfo?.Runtime}
                  </p>
                  <p>{movieInfo?.Country}</p>

                  <p>{movieInfo?.Plot}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalLayout>
  );
}

const ModalLayout = styled.div<{ isOpen: boolean; img?: string }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  background: ${(props) =>
    `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${props.img}) 
  `};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default Modal;
