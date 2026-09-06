import styled from 'styled-components';

export const LanguageSelectorWrapper = styled.div`
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  position: absolute;
  padding: 20px 0;
  margin: 30px;

  select {
    position: absolute;
    height: 70px;
    width: 130px;
    background-color: rgba(0, 0, 0, 0.534);
    color: white;
    border: none;
    font-weight: 600;
    border-radius: 5px;
    padding: 20px 0;
    padding-left: 60px;

    &:focus,
    &:active {
      border: none;
      outline: none;
    }

    option {
      background-color: #272727;
    }
  }
`;

export const LanguageSelectorFlag = styled.img`
  width: 45px;
  height: 30px;
  object-fit: cover;
  border-radius: 3px;
  z-index: 1;
  margin-left: 10px;
`;
