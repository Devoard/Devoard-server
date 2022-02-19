import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const PageWrapper = styled.div`
  margin: 2rem 0;
`;

export const Background = styled.div`
  height: 30rem;
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


export const Title = styled.h1`
  font-family: var(--font-title);
  margin-left: 0.5rem;
`;

export const UserWrapper = styled.div``;