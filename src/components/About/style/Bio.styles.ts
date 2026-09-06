import styled from 'styled-components';

export const BioDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: min(90vw, 950px);
  background: rgba(32, 32, 32, 0.9);
  border-radius: 20px;

  p {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: justify;
    padding: 20px;
    font-weight: 600;

    span {
      margin: 15px auto;
    }
  }

  @media screen and (min-width: 1366px) {
    flex: 1 1 40%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

export const AboutPhotoWrapper = styled.div`
  position: relative;

  @media screen and (max-width: 500px) {
    margin-right: 10%;
  }
`;

export const AboutPhoto = styled.img`
  position: relative;
  z-index: 1;
  width: 70%;
  border-radius: 50%;
  max-width: 300px;
  max-height: 300px;
  border: 5px solid #202020;
`;

export const MiscDiv = styled.div`
  z-index: 0;

  div:nth-child(1) {
    color: #ff3dda;
    top: 10px;
    right: -40px;
  }

  div:nth-child(2) {
    color: #01fbfb;
    top: 40%;
    right: -50px;
  }

  div:nth-child(3) {
    color: #92e42e;
    top: 78%;
    right: -5px;
  }
`;

export const MiscItem = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: #202020;
  padding: 8px;
  padding-left: 100px;
  padding-right: 15px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  span {
    margin-left: 5px;
  }
`;
