import styled from 'styled-components';

export const FooterEl = styled.footer`
  background-color: #202020;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 0;

  h2 {
    color: white;
  }

  div {
    margin: 10px;
  }

  a {
    display: flex;
    color: #9e9e9e;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.5s;
    padding: 8px;
    font-size: 1.2rem;

    svg,
    img {
      width: 25px;
      height: 25px;
      margin-right: 5px;
      padding: 0;
    }

    &:hover {
      color: white;
    }
  }

  @media screen and (min-width: 550px) {
    justify-content: space-evenly;
    padding: 20px calc((100% - 1600px) / 2);
  }
`;

export const ContactDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  a:nth-child(2) svg {
    color: #f0f6fc;
  }

  a:nth-child(3) svg {
    color: #0a66c2;
  }

  a:nth-child(4) svg {
    color: #f0f6fc;
  }
`;

export const MadeWithDiv = styled.div`
  a:nth-child(2) svg {
    color: #99d5e6;
  }

  a:nth-child(4) svg {
    color: #cf659b;
  }
`;

export const ReferencesDiv = styled.div`
  flex: 1 1 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;

  h2 {
    margin-top: 20px;
    flex: 1 1 100%;
  }

  @media screen and (min-width: 550px) {
    a {
      margin: 0 20px;
    }
  }
`;
