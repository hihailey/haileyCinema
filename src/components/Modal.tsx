import { useEffect, useState } from "react";
import styled from "styled-components";
import { MovieData } from "../shared/Interface";
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
    <ModalLayout isOpen={isOpen}>
      <CloseBox onClick={() => closeModal()}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 17L1 1M17 1L1 17"
            stroke="#5C5C5C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CloseBox>

      <ContentWrapper>
        <button onClick={prev}>Prev</button>
        <ContentBox>
          {loader ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <h2>
                {movieInfo?.Title} ({movieInfo?.Year})
              </h2>
              <div>{movieInfo?.Genre}</div>
              <img alt={movieInfo?.Title} src={movieInfo?.Poster} />
            </>
          )}
        </ContentBox>
        <button onClick={next}>Next</button>
      </ContentWrapper>
    </ModalLayout>
  );
}

const ModalLayout = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  border: 1px solid black;
  padding: 24px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: white;
`;

const CloseBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
  gap: 12px;
`;

export default Modal;
