import { useState, useEffect } from 'react';
import {
  HomeWrapper,
  RecruitDisplayWrapper,
  RecruitDisplayText,
  RecruitNum,
  RecruitBtnWrapper,
  ApplyBtn,
  RecruitBtn,
  IntroTextWrapper,
  IntroText
} from '../styles/Home';



const Home = () => {
  const [recruitNum, setRecruitNum] = useState(123);

  useEffect(() => {
    RecruitNumAnimation();
  }, []);

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
    </HomeWrapper>
  );
}

export default Home;