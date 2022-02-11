import { useState } from 'react';
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
  NumText,
  ComboBox,
  OptGroup,
  Option,
  TagWrapper,
  TextArea,
  ProjectWrapper,
  RecruitNumWrapper,
  DetailWrapper,
  PeriodWrapper,
  StateWrapper,
  BtnWrapper,
  PostBtn,
} from '../styles/Write';

const Write = () => {
  const [selectedField, setSelectedField] = useState("");
  const [recruitNum, setRecruitNum] = useState("");
  const [selectedStack, setSelectedStack] = useState("");

  const addRecruit = () => { 
    if (selectedField === "") alert('모집 영역 선택'); 
    if (isNaN(recruitNum) || recruitNum === "") alert("숫자 다시 입력");
  }

  const addStack = () => {
    if (selectedStack === "") alert('기술 스택 선택'); 
  }

  const resizeTextArea = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = (14 + e.target.scrollHeight) + "px";
  }

  
  return (
    <WritePageWrapper>
      <WriteTitle>모집 글 작성하기</WriteTitle>
      <WriteWrapper>
        <ProjectWrapper>
          <Text>프로젝트 명</Text>
          <Input style={{ width: '65%' }}/>
        </ProjectWrapper>
        <RecruitNumWrapper>
          <Text>모집 인원</Text>
          <ColumnAlignWrapper>
            <SelectWrapper>
              <ComboBox 
                id="field" 
                name="field" 
                onChange={(e)=>setSelectedField(e.target.value)}
              >
                <Option label="-- 선택하세요 --" />
                <Option value="Front-end">Front-end</Option>
                <Option value="Back-end">Back-end</Option>
                <Option value="Android">Android</Option>
                <Option value="IOS">IOS</Option>
                <Option value="Data">Data</Option>
                <Option value="Devops">Devops</Option>
              </ComboBox>
              <Input 
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitNum(e.target.value)}
              />
              <NumText>명</NumText>
              <AddBtn onClick={addRecruit}>+ 추가</AddBtn>
            </SelectWrapper>
          </ColumnAlignWrapper>
        </RecruitNumWrapper>
        <StackWrapper>
          <Text>기술 스택</Text>
          <ColumnAlignWrapper>
            <SelectWrapper>
              <ComboBox 
                id="stack" 
                name="stack"
                onChange={(e)=>setSelectedStack(e.target.value)}
              >
                <Option label="-- 선택하세요 --" />
                <OptGroup label="Front-end">
                  <Option key="1" value="React">React</Option>
                  <Option key="2" value="TypeScript">TypeScript</Option>
                  <Option key="3" value="Angular">Angular</Option>
                  <Option key="4" value="Vue">Vue</Option>
                  <Option key="5" value="Ember">Ember</Option>
                  <Option key="6" value="Node">Node</Option>
                  <Option key="7" value="Nuxt">Nuxt</Option>
                  <Option key="8" value="Next">Next</Option>
                  <Option key="0" value="etc">etc</Option>
                </OptGroup>
                <OptGroup label="Back-end">
                  <Option key="9" value="Flask">Flask</Option>
                  <Option key="10" value="Django">Django</Option>
                  <Option key="11" value="Spring">Spring</Option>
                  <Option key="12" value="Express">Express</Option>
                  <Option key="13" value="Koa">Koa</Option>
                  <Option key="0" value="etc">etc</Option>
                </OptGroup>
                <OptGroup label="Android">
                  <Option key="14" value="Android">Android</Option>
                </OptGroup>
                <OptGroup label="IOS">
                  <Option key="15" value="Swift">Swift</Option>
                  <Option key="16" value="Object-C">Object-C</Option>
                  <Option key="17" value="etc">etc</Option>
                </OptGroup>
                <OptGroup label="Data">
                  <Option key="18" value="Data">Data</Option>
                </OptGroup>
                <OptGroup label="Devops">
                  <Option key="19" value="Devops">Devops</Option>
                </OptGroup>
              </ComboBox>
              <AddBtn onClick={addStack}>+ 추가</AddBtn>
            </SelectWrapper>
            <TagWrapper>
              <AddTag>React</AddTag>
              <AddTag>React</AddTag>
              <AddTag>React</AddTag>
              <AddTag>React</AddTag>
              <AddTag>React</AddTag>
              <AddTag>HTML</AddTag>
              <AddTag>CSS</AddTag>
              <AddTag>JS</AddTag>
            </TagWrapper>
          </ColumnAlignWrapper>
        </StackWrapper>
        <DetailWrapper>
          <Text>프로젝트 설명</Text>
          <TextArea onChange={resizeTextArea} />
        </DetailWrapper>
        <PeriodWrapper>
          <Text>예상 개발 기간</Text>
          <TextArea onChange={resizeTextArea} />
        </PeriodWrapper>
        <StateWrapper>
          <Text>현재 진행 상황</Text>
          <TextArea onChange={resizeTextArea} />
        </StateWrapper>
        <BtnWrapper>
          <PostBtn 
            color="orange" 
            large
            style={{marginTop: '2rem'}}
          >
            등록하기
          </PostBtn>
        </BtnWrapper>
      </WriteWrapper>
    </WritePageWrapper>
  )
}

export default Write;