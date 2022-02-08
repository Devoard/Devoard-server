import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProjectDetail from '../components/ProjectDetail';
import {
  HomeWrapper,
  RecruitDisplayWrapper,
  RecruitDisplayText,
  RecruitNum,
  RecruitBtnWrapper,
  ApplyBtn,
  RecruitBtn,
  IntroTextWrapper,
  IntroText,
  PopularTeamWrapper,
  PopularTeamText,
  ProjectDetailWrapper,
  MoreProjectBtn
} from '../styles/Home';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';



const Home = () => {
  const [recruitNum, setRecruitNum] = useState(123);
  const dispatch = useDispatch();
  const project_wrapper = useRef(null);
  const text = "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText";

  useEffect(() => {
    const RecruitNumAnimation = () => {
      let num = 0;
  
      setInterval(()=>{
        if (num === recruitNum) return null;
        setRecruitNum(++num);
      }, 1000/recruitNum);
    };

    RecruitNumAnimation();
    dispatch(setActivePage('home'));
    project_wrapper.current.addEventListener('mousewheel', handleHorizontalScroll);
  
  }, [setActivePage]);

  const handleHorizontalScroll = (e) => {
    e.preventDefault();
    if(e.wheelDelta > 0)
      project_wrapper.current.scrollLeft -= 60;
    else
      project_wrapper.current.scrollLeft += 60;
  }

  return (
    <HomeWrapper>
      <RecruitDisplayWrapper>
        <RecruitDisplayText>
          <RecruitNum>{recruitNum}</RecruitNum> 팀<br/>
          현재 모집 중
        </RecruitDisplayText>
        <RecruitBtnWrapper>
          <Link to="/devoard">
            <ApplyBtn color="orange">지원하기</ApplyBtn>
          </Link>
          <RecruitBtn color="orange">모집하기</RecruitBtn>
        </RecruitBtnWrapper>
      </RecruitDisplayWrapper>
      <IntroTextWrapper>
        <IntroText>사이트 소개</IntroText>
      </IntroTextWrapper>
      <PopularTeamWrapper>
        <PopularTeamText>현재 인기 있는 모집 팀</PopularTeamText>
        <ProjectDetailWrapper
          ref={project_wrapper}
        >
          <ProjectDetail 
            recruitState={true}
            projectTitle="Project Title"
            projectText={text}
            tagName="TAGTAG"
          />
          <ProjectDetail
            recruitState={false}
            projectTitle="Title"
            projectText="Text"
            tagName="Tag2"
          />
           <ProjectDetail 
            recruitState={true}
            projectTitle="Title"
            projectText="Text"
            tagName="Tag"
          />
          <ProjectDetail
            recruitState={false}
            projectTitle="Title"
            projectText="Text"
            tagName="Tag"
          />
           <ProjectDetail 
            recruitState={true}
            projectTitle="Title"
            projectText="Text"
            tagName="Tag"
          />
          <ProjectDetail
            recruitState={false}
            projectTitle="Title"
            projectText="Text"
            tagName="Tag"
          />
        </ProjectDetailWrapper>
        <Link
          to='/devoard'>
          <MoreProjectBtn 
            color="orange"
            outline
          >
            프로젝트 더 보기
          </MoreProjectBtn>
        </Link>
      </PopularTeamWrapper>
    </HomeWrapper>
  );
}

export default Home;