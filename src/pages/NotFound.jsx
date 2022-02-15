import { useEffect } from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePage('not_found'));
  }, [setActivePage]);
  
  return (
    <NotFoundPage>
      404
    </NotFoundPage>
  );
}

export default NotFound;