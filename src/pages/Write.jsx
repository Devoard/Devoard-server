import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostAPI from '../api/PostAPI';
import AddTag from '../components/AddTag';
import {
  WritePageWrapper,
  WriteTitle,
  WriteWrapper,
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
  ProjectWrapper,
  RecruitCntWrapper,
  DetailWrapper,
  PeriodWrapper,
  StateWrapper,
  BtnWrapper,
  PostBtn,
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
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [stacks, setStacks] = useState([]);
  const [period, setPeriod] = useState(null);
  const [selectedStack, setSelectedStack] = useState("");
  const [situation, setSituation] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [isExistStack, setIsExistStack] = useState(false);
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
    console.log(stacks);
  }, [stacks])
  
  return (
    <WritePageWrapper>
      <WriteTitle>모집 글 작성하기</WriteTitle>
      <WriteWrapper>
        <ProjectWrapper>
          <Text>프로젝트 명</Text>
          <Input 
            style={{ width: '65%' }}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </ProjectWrapper>
        <RecruitCntWrapper>
          <Text>모집 인원</Text>
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
        <DetailWrapper>
          <Text>프로젝트 설명</Text>
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
        <StateWrapper>
          <Text>현재 진행 상황</Text>
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
            onClick={createPost}
          >
            등록하기
          </PostBtn>
        </BtnWrapper>
      </WriteWrapper>
    </WritePageWrapper>
  )
}

export default Write;