import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../modules/user';
import RecruitState from '../components/RecruitState';
import Tag from '../components/Tag';
import Button from '../components/Button';
import PopUp from '../components/PopUp';
import PostAPI from '../api/PostAPI';
import {
  PageWrapper,
  Background,
  StateWrapper,
  UpdateWrapper,
  Edit,
  Remove,
  DetailWrapper,
  Title,
  InfoWrapper,
  UserWrapper,
  UserImg,
  UserName,
  DataWrapper,
  WriteDate,
  HeartWrapper,
  Heart,
  HeartCnt,
  DividerLine,
  TagWrapper,
  BodyWrapper,
  SubTitle,
  RecruitCnt,
  Field,
  Body,
  Period,
  Situation,
  ButtonWrapper,
  CheckText,
  PopUpBtnWrapper
} from '../styles/DevoardDetail';


const DevoardDetail = () => {
  const [post, setPost] = useState(null);
  const [isWriter, setIsWriter] = useState(false);
  const [isRemovePopUp, setIsRemovePopUp] = useState(false);
  const [isCheckPopUp, setIsCheckPopUp] = useState(false);
  const { loggedUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;


  const getPost = async() => {
    const post = await PostAPI.getDetailPost(postId);
    setPost(post);
  }

  const removePost = async() => {
    await PostAPI.removePost(postId);
    navigate('/devoard');
  }

  const updateRecruitState = async() => {
    await PostAPI.updatePost(postId, { recruit_state: false });
    setIsCheckPopUp(false);
    getPost();
  }

  useEffect(() => {
    dispatch(setActivePage('detail'));
    getPost();
  }, []);

  useEffect(() => {
    const checkIsWriter = () => {
      if (post.writer_info.id === loggedUser.id) 
        setIsWriter(true);
    }

    if (post) checkIsWriter();
  }, [post, loggedUser]);

  if (post === null) return null; 
  return (
    <PageWrapper>
      <Background>
        <StateWrapper>
          <RecruitState isRecruit={post.recruit_state}/>
            <UpdateWrapper>
            {isWriter && post.recruit_state &&
            <Link to={`/write/${postId}`} style={{textDecoration: 'none'}}>
              <Edit>수정</Edit>
            </Link>}
            <Remove
              onClick={()=>setIsRemovePopUp(true)}
            >
              삭제
            </Remove>
          </UpdateWrapper>
        </StateWrapper>
        <DetailWrapper>
          <Title>{post.title}</Title>
          <InfoWrapper>
            <UserWrapper>
              <UserImg src={post.writer_info.imageUrl} />
              <UserName>{post.writer_info.username}</UserName>
            </UserWrapper>
            <DataWrapper>
              <WriteDate>{post.date}</WriteDate>
              <HeartWrapper>
                <Heart />
                <HeartCnt>100</HeartCnt>
              </HeartWrapper>
            </DataWrapper>
          </InfoWrapper>
          <DividerLine />
          <TagWrapper>
          {post.tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
          </TagWrapper>
          <BodyWrapper>
            <SubTitle>모집 인원</SubTitle>
            <RecruitCnt>
              {post.recruit_cnt.front_end &&
                <Field>Front-end : {post.recruit_cnt.front_end} 명</Field>}
              {post.recruit_cnt.back_end &&
                <Field>Back-end : {post.recruit_cnt.back_end} 명</Field>}
              {post.recruit_cnt.android &&
                <Field>Android : {post.recruit_cnt.android} 명</Field>} 
              {post.recruit_cnt.ios &&
                <Field>IOS : {post.recruit_cnt.ios} 명</Field>} 
              {post.recruit_cnt.data &&
                <Field>Data : {post.recruit_cnt.data} 명</Field>} 
              {post.recruit_cnt.devops &&
                <Field>Devops : {post.recruit_cnt.devops} 명</Field>}  
            </RecruitCnt>
            <SubTitle>프로젝트 설명</SubTitle>
            <Body>
              {post.body}
            </Body>
            <SubTitle>예상 개발 기간</SubTitle>
            <Period>
              {post.period}
            </Period>
            <SubTitle>진행 상황</SubTitle>
            <Situation>
              {post.situation}
            </Situation>
            <ButtonWrapper>
            {isWriter && post.recruit_state &&
              <Button 
                onClick={()=>setIsCheckPopUp(true)}
                color='orange'
              >
                모집 완료
              </Button>}
            </ButtonWrapper>
          </BodyWrapper>
        </DetailWrapper>
      </Background>
      <PopUp
        isVisible={isCheckPopUp}
        width={'30rem'}
        height={'13rem'}
        setIsPopUp={setIsCheckPopUp}
      >
        <CheckText>모집을 완료하시겠습니까?</CheckText>
        <PopUpBtnWrapper>
          <Button
            color="gray"
            onClick={()=>setIsCheckPopUp(false)}
          >취소</Button>
          <Button
            color="orange"
            style={{marginLeft: '1rem'}}
            onClick={updateRecruitState}
          >확인</Button>

        </PopUpBtnWrapper>
      </PopUp>
      <PopUp
        isVisible={isRemovePopUp}
        width={'30rem'}
        height={'13rem'}
        setIsPopUp={setIsRemovePopUp}
      >
        <CheckText>게시물을 삭제하시겠습니까?</CheckText>
        <PopUpBtnWrapper>
          <Button
            color="gray"
            onClick={()=>setIsRemovePopUp(false)}
          >취소</Button>
          <Button
            color="orange"
            style={{marginLeft: '1rem'}}
            onClick={removePost}
          >확인</Button>

        </PopUpBtnWrapper>
      </PopUp>
    </PageWrapper>
  );
}

export default DevoardDetail;