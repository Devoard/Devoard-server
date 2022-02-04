import styled from 'styled-components';
import RecruitState from '../components/RecruitState';
import Tag from '../components/Tag';

const ProjectDetailWrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 25rem;
  height: 17rem;
  background: white;
  border-radius: 0.7rem;
  padding: 0.8rem;
  margin-right: 2rem;
  cursor: pointer;
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
  margin: 0.7rem auto;
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
  -webkit-line-clamp: 5; 
  -webkit-box-orient: vertical; 
  text-overflow: ellipsis;
  box-sizing: border-box;
  height: 7.9rem;
  width: 100%;
  padding: 0.5rem;
  padding-top: 0.2rem;
  margin-left: 0.2rem;
  text-align: left;
  word-wrap:break-word; 
  white-space: normal;  
  overflow: hidden;
`;


const ProjectDetail = ({ recruitState, projectTitle, projectText, TagName }) => {
  return (
    <ProjectDetailWrapper>
      <RecruitState 
        isRecruit={recruitState}
      />
      <ProjectTitle>{projectTitle}</ProjectTitle>
      <DividerLine />
      
      <TagWrapper>
        <Tag>{TagName}</Tag>
        <Tag>{TagName}</Tag>
        <Tag>{TagName}</Tag>
        <Tag>{TagName}</Tag>
        <Tag>{TagName}</Tag>
      </TagWrapper>
      <ProjectText>
        {projectText}
      </ProjectText>
    </ProjectDetailWrapper>
  )
}

export default ProjectDetail;