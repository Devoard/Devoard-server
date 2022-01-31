import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/user';
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
  PopularTeamText
} from '../styles/Home';



const Home = () => {
  const [recruitNum, setRecruitNum] = useState(123);
  const { setActivePage } = useContext(UserContext);

  useEffect(() => {
    RecruitNumAnimation();
    setActivePage('home');
  }, [setActivePage]);

  const RecruitNumAnimation = () => {
    let num = 0;

    setInterval(()=>{
      if (num === recruitNum) return null;
      setRecruitNum(++num);
    }, 1000/recruitNum);
  }


  return (
    <HomeWrapper>
      <RecruitDisplayWrapper>
        <RecruitDisplayText>
          <RecruitNum>{recruitNum}</RecruitNum> 팀<br/>
          현재 모집 중
        </RecruitDisplayText>
        <RecruitBtnWrapper>
          <ApplyBtn color="orange">지원하기</ApplyBtn>
          <RecruitBtn color="orange">모집하기</RecruitBtn>
        </RecruitBtnWrapper>
      </RecruitDisplayWrapper>
      <IntroTextWrapper>
        <IntroText>사이트 소개</IntroText>
      </IntroTextWrapper>
      <PopularTeamWrapper>
        <PopularTeamText>현재 인기 있는 모집 팀</PopularTeamText>
      </PopularTeamWrapper>
    </HomeWrapper>
  );
}

export default Home;