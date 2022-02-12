import { useEffect, useContext } from 'react';
import { UserContext } from '../context/user';
import styled from "styled-components";

const NotFoundPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -6rem;
  font-size: 64px;
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  z-index: -1;
`;


const NotFound = () => {
  const { setActivePage } = useContext(UserContext);

  useEffect(() => {
    setActivePage('home');
  }, [setActivePage]);
  
  return (
    <NotFoundPage>
      404
    </NotFoundPage>
  );
}

export default NotFound;