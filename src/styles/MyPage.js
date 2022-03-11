import styled from 'styled-components';
import Button from '../components/Button';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const Background = styled.div`
  @media (min-width: 1400px) {
    padding: 3rem;
  }
  background: white;
  border-radius: 0.7rem;
  padding: 2rem;
`;

export const UserImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;

`;

export const ImgInput = styled.input`
  display: none;
`;

export const UploadButton = styled(Button)`
  width: 15rem;
  margin-top: 1rem;
`;

export const DeleteButton = styled(Button)`
  width: 15rem;
  margin-top: 1rem;
`;
