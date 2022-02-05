import styled from 'styled-components';
import { GoTriangleDown } from 'react-icons/go';

export const DevoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const DevoardText = styled.div`
  color: white;
  font-size: 1.3rem;
  margin-left: 1rem;
`;

export const ProjectWrapper = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 30rem)
  }
  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr)
  }
  @media (max-width: 780px) {
    grid-template-columns: 30rem
  }
  
  margin: 0 auto;
  margin-top: 2rem;
`;

export const SortingWrapper = styled.div``;

export const ComboBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 8rem;
  height: 1.8rem;
  border-radius: 0.3rem;
  background: white;
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-bottom: 0;
  cursor: pointer;
`;

export const SelectedText = styled.span``;

export const DownIcon = styled(GoTriangleDown)`
  position: absolute;
  right: 0;
  margin-right: 0.3rem;
  fill: black;
`;

export const MenuWrapper = styled.div`
  position: absolute;
  top: 2.2rem;
  right: 0;
  box-shadow: 0px 0px 12px #444444;
`;

export const Menu = styled.div`
  line-height: 2.7;
  color: black;
  width: 8rem;
  height: 2.5rem;
  background: white;
  text-align: center;
  font-size: 0.95rem;

  &:hover { background: lightgray };
`;