import styled from 'styled-components';
import { FiHeart } from 'react-icons/fi';

export const PageWrapper = styled.div`
  margin: 2rem 0;
`;

export const Background = styled.div`
  background: white;
  border-radius: 0.7rem;
  padding: 1.5rem;
`;

export const StateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const UpdateWrapper = styled.div`
  display: flex;
`;

export const Edit = styled.div`
  color: gray;
  margin-right: 1rem;
  cursor: pointer;
  &:hover { color: black};
`; 

export const Remove = styled.div`
  color: gray;
  cursor: pointer;
  &:hover { color: black};
`;


export const DetailWrapper = styled.div`
  padding: 0 1rem;
`;

export const Title = styled.h1`
  font-family: var(--font-title);
`;


// user

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export const UserName = styled.div`
  color: black;
`;

export const DataWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const WriteDate = styled.div`
  font-size: 0.9rem;
  margin-top: 0.1rem;
`;

export const HeartWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
  border-radius: 1rem;
  border: 1px solid gray;
  padding: 0.05rem 0.5rem;
  margin-left: 0.7rem;
  cursor: pointer;
`;

export const Heart = styled(FiHeart)`
  margin: 0 0.3rem;
`;

export const HeartCnt = styled.div`
  margin-right: 0.3rem;
  font-size: 0.95rem;
  margin-top: 0.1rem;
`;

export const DividerLine = styled.hr`
  margin-bottom: 1rem;
`;

export const TagWrapper = styled.div`
  * { margin-right: 0.5rem; }
`;



export const BodyWrapper = styled.div``;

export const SubTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const RecruitCnt = styled.div`
  padding: 0 0.5rem;
`;

export const Field = styled.div``;

export const Body = styled.div`
  padding: 0 0.5rem;
`;

export const Period = styled.div`
  padding: 0 0.5rem;
`;

export const Situation = styled.div`
  padding: 0 0.5rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

// PopUp

export const CheckText = styled.div`
  font-size: 1.4rem;
  font-family: var(--font-title);
  margin-top: 3rem;
`;

export const PopUpBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 4rem;
`;