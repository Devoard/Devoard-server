import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';

const AddTagWrapper = styled.div`
  background: lightgray;
  color: black;
  padding: 0.2rem 0.7rem;
  padding-right: 2rem;
  border-radius: 0.3rem;
  height: 1.4rem;
  position: relative;
`;

const TagName = styled.span`
  margin: 0 !important;
`;

const CloseIcon = styled(IoIosClose)`
  margin: 0 !important;
  position: absolute;
  right: 0.1rem;
  cursor: pointer;
`;

const AddTag = ({ children }) => {
  return (
    <AddTagWrapper>
      <TagName>{children}</TagName>
      <CloseIcon size='24'/>
    </AddTagWrapper>
  )
}

export default AddTag;