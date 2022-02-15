import RecruitState from '../components/RecruitState';
import {
  PageWrapper,
  Background,
  StateWrapper,
  UpdateWrapper,
  Edit,
  Remove,
  Title
} from '../styles/DevoardDetail';


const DevoardDetail = () => {
  return (
    <PageWrapper>
      <Background>
        <StateWrapper>
          <RecruitState isRecruit={true}/>
          <UpdateWrapper>
            <Edit>수정</Edit>
            <Remove>삭제</Remove>
          </UpdateWrapper>
        </StateWrapper>
        <Title>React 개발자 구합니다</Title>
      </Background>
    </PageWrapper>
  );
}

export default DevoardDetail;