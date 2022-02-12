import { useState } from 'react';
import styled from 'styled-components';
import RecruitState from '../components/RecruitState';
import Tag from '../components/Tag';
import { FiHeart } from 'react-icons/fi';

const ProjectDetailWrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 28rem;
  height: 20rem;
  background: white;
  border-radius: 0.7rem;
  padding: 0.8rem;
  margin: 0.7rem;
  text-align: center;
  cursor: pointer;
`;

const StateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Heart = styled(FiHeart)`
  &:hover { opacity: 0.8 }
`;

const ProjectTitle = styled.span`
  display: inline-block;
  margin-top: 0.7rem;
  font-size: 1.5rem;
  color: var(--color-title);
  font-family: var(--font-title);
  white-space: normal;
`;

const DividerLine = styled.div`
  background: #666666;
  width: 95%;
  margin: 1rem auto;
  height: 1.5px;
`;

const TagWrapper = styled.div`
  height: 30px;
  text-align: left;
  overflow: hidden;
  margin: 0 0.8rem;

  * {
    margin-right: 0.4rem;
  }
`;

const ProjectText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 6; 
  -webkit-box-orient: vertical; 
  text-overflow: ellipsis;
  box-sizing: border-box;
  height: 9.5rem;
  width: 100%;
  padding: 0.5rem;
  padding-top: 0.4rem;
  margin-left: 0.2rem;
  text-align: left;
  word-wrap:break-word; 
  white-space: normal;  
  overflow: hidden;
`;


const ProjectDetail = ({ isScrapped, recruitState, projectTitle, projectText, tagName }) => {
  const [isColored, setIsColored] = useState(isScrapped);
  
  return (
    <ProjectDetailWrapper>
      <StateWrapper>
        <RecruitState 
          isRecruit={recruitState}
        />
        <Heart 
          size='24'
          color={isColored ? "#fd4646" : "#3A3D3E"}
          onClick={()=>setIsColored(!isColored)}
        />
      </StateWrapper>
     
      <ProjectTitle>{projectTitle}</ProjectTitle>
      <DividerLine />
      
      <TagWrapper>
        <Tag>{tagName}</Tag>
      </TagWrapper>
      <ProjectText>
        {projectText}
      </ProjectText>
    </ProjectDetailWrapper>
  )
}

export default ProjectDetail;