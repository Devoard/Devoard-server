import styled from 'styled-components';
import RecruitState from '../components/RecruitState';

const ProjectDetailWrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 25rem;
  height: 17rem;
  background: white;
  border-radius: 0.7rem;
  padding: 0.8rem;
  margin-right: 2rem;
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
  background: #444444;
  width: 100%;
  margin-top: 0.7rem;
  margin-bottom: 0.5rem;
  height: 1.5px;
`;

const TagWrapper = styled.div`
  height: 30px;
  text-align: left;
`;

const ProjectText = styled.div`
  box-sizing: border-box;
  height: 7.9rem;
  white-space: normal;  
  padding: 0.5rem;
  text-align: left;
`;


const ProjectDetail = ({ recruitState, projectTitle, projectText }) => {
  return (
    <ProjectDetailWrapper>
      <RecruitState 
        isRecruit={recruitState}
      />
      <ProjectTitle>{projectTitle}</ProjectTitle>
      <DividerLine />
      <TagWrapper></TagWrapper>
      <ProjectText>{projectText}</ProjectText>
    </ProjectDetailWrapper>
  )
}

export default ProjectDetail;