import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { dataList } from './surveyData';
import SurveyComp from '../components/SurveyComp';
const SurveyPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 100px auto;
    width: 50%;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 16px;
    background: #fff;
    border-radius: 50px;
    overflow: hidden;
`;
const ProgressStatus = styled.div`
    height: 100%;
    width: ${props=>props.status * (100/12)}%;
    border-radius: 50px;
    background: var(--color-orange);
`;
const CuntrolBox = styled.div`
    display: flex;
`;
const Button = styled.button`
    background: #fff;
    border: none;
    cursor: pointer;
    margin: 10px;
`;
const Survey = () => {
    const [progressRate, setProgressRate] = useState(0);
    const [dataId, setDataId] = useState(1);
    const [firstAnswer, setFirstAnswer] = useState('');
    useEffect(()=>{
        setProgressRate(dataId);
    }, [dataId]);

    
    const onPrevClick = () => {
        setDataId(prev=>prev-1);
    }

    const onNextClick = () => {
        setDataId(prev=>prev+1);
    }
  
    return(
        <SurveyPage>
            <ProgressBar>
                <ProgressStatus status={progressRate} />
            </ProgressBar>
            {dataList.map((v, i)=>{
                if(i+1===dataId){
                    return <SurveyComp key={i} data={v} firstAnswer={firstAnswer} setFirstAnswer={setFirstAnswer}/>
                }
            })}
            <CuntrolBox>
                <Button onClick={onPrevClick} >이전</Button>
                <Button onClick={onNextClick} >다음</Button>
            </CuntrolBox>
        </SurveyPage>

    )
}
export default Survey