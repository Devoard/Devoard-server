import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostAPI from '../api/PostAPI';
import AddTag from '../components/AddTag';
import PopUp from '../components/PopUp';
import Button from '../components/Button';
import {
  PageWrapper,
  WriteTitle,
  Background,
  Input,
  Text,
  AddBtn,
  StackWrapper,
  ColumnAlignWrapper,
  SelectWrapper,
  FieldText,
  WarningText,
  NumText,
  ComboBox,
  OptGroup,
  Option,
  TagWrapper,
  TextArea,
  TitleWrapper,
  RecruitCntWrapper,
  DetailWrapper,
  PeriodWrapper,
  StateWrapper,
  BtnWrapper,
  PostBtn,
  CheckText,
  PopUpBtnWrapper
} from '../styles/Write';

const Write = () => {
  const [recruitCnt, setRecruitCnt] = useState({
    front_end: 0,
    back_end: 0,
    android: 0,
    ios: 0,
    data: 0,
    devops: 0
  });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [stacks, setStacks] = useState([]);
  const [period, setPeriod] = useState("");
  const [selectedStack, setSelectedStack] = useState("");
  const [situation, setSituation] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [isWarning, setIsWarning] = useState(false);
  const [isExistStack, setIsExistStack] = useState(false);
  const [isCheckPopUp, setIsCheckPopUp] = useState(false);
  const navigate = useNavigate();


  const createPost = async() => { 
    await PostAPI.createPost({
      title: title,
      body: body,
      tags: stacks,
      recruit_cnt: recruitCnt,
      period: period,
      situation: situation,
      recruit_state: true
    })
    .then(navigate("/devoard"));
  }

  const isExistTag = (selected) => {
    for (let stack of stacks) {
      if (stack === selected)
        return true;
    }

    return false;
  }

  const addStack = () => {
    const selected = selectedStack;
    setSelectedStack(""); 

    if (selected === "") return null;

    if (isExistTag(selected)){
      setIsExistStack(true);
      return null;
    }
    
    setIsExistStack(false);
    setStacks([ ...stacks, selected ])
  }

  const resizeTextArea = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = (14 + e.target.scrollHeight) + "px";
  }

  const checkForm = () => {
    if (title === "" || !isValidRecruitCnt() || body === "" || situation === "")
      setIsWarning(true);
    else
      setIsCheckPopUp(true);
  }

  const isValidRecruitCnt = () => {
    let total = 0;
    for (let cnt of Object.values(recruitCnt)) {
      if (isNaN(cnt)) return false;
      total += cnt;
    }
    
    return (total === 0 ? false : true);
  }




  useEffect(() => {
    const removeStack = () => {
      setStacks(stacks.filter(stack => stack !== selectedTag));
    }

    removeStack();
  }, [selectedTag]);

  useEffect(() => {
    setTimeout(()=>{
      setIsExistStack(false);
    }, 3000);
  }, [isExistStack]);

  useEffect(() => {
    isValidRecruitCnt();
  }, [recruitCnt]);


  
  return (
    <PageWrapper>
      <WriteTitle>모집 글 작성하기</WriteTitle>
      <Background>
        <WarningText style={{marginBottom: '2rem'}}>* 은 필수 항목입니다</WarningText>
        <TitleWrapper
          isWarning={isWarning && title === "" ? true : false}
        >
          <Text>* 프로젝트 명</Text>
          <ColumnAlignWrapper
            style={{ width: '65%' }}
          >
            <Input 
              onChange={(e)=>setTitle(e.target.value)}
            />
          </ColumnAlignWrapper>
          
        </TitleWrapper>
      
        <RecruitCntWrapper
          isWarning={isWarning && !isValidRecruitCnt() ? true : false}
        >
          <Text>* 모집 인원</Text>
          <ColumnAlignWrapper>
            <SelectWrapper>
              <FieldText>Front-end</FieldText>
              <Input 
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, front_end: Number(e.target.value) })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            <SelectWrapper>
              <FieldText>Back-end</FieldText>
              <Input 
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, back_end: Number(e.target.value) })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            <SelectWrapper>
              <FieldText>Android</FieldText>
              <Input 
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, android: Number(e.target.value) })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            <SelectWrapper>
              <FieldText>IOS</FieldText>
              <Input 
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, ios: Number(e.target.value) })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            <SelectWrapper>
              <FieldText>Data</FieldText>
              <Input 
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, data: Number(e.target.value) })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            <SelectWrapper>
              <FieldText>Devops</FieldText>
              <Input 
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, devops: Number(e.target.value) })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            {isWarning && !isValidRecruitCnt() ?
              <WarningText
                style={{ marginTop: '1rem'}}
              >모집 인원은 최소 1명이며, 숫자로 입력해야 합니다
              </WarningText> : ""
            }
          </ColumnAlignWrapper>
        </RecruitCntWrapper>
        <StackWrapper>
          <Text>기술 스택</Text>
          <ColumnAlignWrapper>
            <SelectWrapper>
              <ComboBox 
                id="stack" 
                name="stack"
                value={selectedStack}
                isWarning={isExistStack}
                onChange={(e)=>setSelectedStack(e.target.value)}
              >
                <Option label="-- 선택하세요 --" />
                <OptGroup label="Front-end">
                  <Option value="React">React</Option>
                  <Option value="TypeScript">TypeScript</Option>
                  <Option value="Angular">Angular</Option>
                  <Option value="Vue">Vue</Option>
                  <Option value="Ember">Ember</Option>
                  <Option value="Node">Node</Option>
                  <Option value="Nuxt">Nuxt</Option>
                  <Option value="Next">Next</Option>
                  <Option value="etc">etc</Option>
                </OptGroup>
                <OptGroup label="Back-end">
                  <Option value="Flask">Flask</Option>
                  <Option value="Django">Django</Option>
                  <Option value="Spring">Spring</Option>
                  <Option value="Express">Express</Option>
                  <Option value="Koa">Koa</Option>
                  <Option value="etc">etc</Option>
                </OptGroup>
                <OptGroup label="Android">
                  <Option value="Android">Android</Option>
                </OptGroup>
                <OptGroup label="IOS">
                  <Option value="Swift">Swift</Option>
                  <Option value="Object-C">Object-C</Option>
                  <Option value="etc">etc</Option>
                </OptGroup>
                <OptGroup label="Data">
                  <Option value="Data">Data</Option>
                </OptGroup>
                <OptGroup label="Devops">
                  <Option value="Devops">Devops</Option>
                </OptGroup>
              </ComboBox>
              <AddBtn onClick={addStack}>+ 추가</AddBtn>
            </SelectWrapper>
            {isExistStack ?
            <WarningText>이미 추가된 태그입니다.</WarningText> : ""
            }
            <TagWrapper>
              {stacks &&
                stacks.map((tag, i) => (
                  <AddTag 
                    key={i}
                    setSelectedTag={setSelectedTag}
                  >
                    {tag}
                  </AddTag>
                ))
              }
            </TagWrapper>
          </ColumnAlignWrapper>
        </StackWrapper>
        <DetailWrapper
          isWarning={isWarning && body === "" ? true : false}
        >
          <Text>* 상세 설명</Text>
          <TextArea 
            onChange={(e) => {
              resizeTextArea(e);
              setBody(e.target.value);
            }} 
          />
        </DetailWrapper>
        <PeriodWrapper>
          <Text>예상 개발 기간</Text>
          <TextArea 
            onChange={(e) => {
              resizeTextArea(e);
              setPeriod(e.target.value);
            }} 
          />
        </PeriodWrapper>
        <StateWrapper
          isWarning={isWarning && situation === "" ? true : false}
        >
          <Text>* 진행 상황</Text>
          <ComboBox
            id="situation" 
            name="situation"
            value={situation}
            onChange={(e)=>setSituation(e.target.value)}
          >
            <Option label="-- 선택하세요 --" />
            <Option value="준비 중">준비 중</Option>
            <Option value="진행 중">진행 중</Option>
            <Option value="진행 완료">진행 완료</Option>
          </ComboBox>
        </StateWrapper>
        <BtnWrapper>
          <PostBtn 
            color="orange" 
            large
            style={{marginTop: '2rem'}}
            onClick={checkForm}
          >
            등록하기
          </PostBtn>
        </BtnWrapper>
      </Background>
      <PopUp
        isVisible={isCheckPopUp}
        width={'30rem'}
        height={'13rem'}
        setIsPopUp={setIsCheckPopUp}
      >
        <CheckText>글을 등록하시겠습니까?</CheckText>
        <PopUpBtnWrapper>
          <Button
            color="gray"
            onClick={()=>setIsCheckPopUp(false)}
          >취소</Button>
          <Button
            color="orange"
            style={{marginLeft: '1rem'}}
            onClick={createPost}
          >확인</Button>

        </PopUpBtnWrapper>
      </PopUp>
    </PageWrapper>
  )
}

export default Write;