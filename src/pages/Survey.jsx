import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { dataList } from './surveyData';
import SurveyComp from '../components/SurveyComp';
import Button from '../components/Button';

const SurveyPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 100px auto;
    width: 60%;
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

const Survey = () => {
    const [progressRate, setProgressRate] = useState(0);
    const [dataId, setDataId] = useState(1);
    const [firstAnswer, setFirstAnswer] = useState('');
    useEffect(()=>{
        setProgressRate(dataId);
    }, [dataId]);

    
    const onPrevClick = () => {
        if(dataId <= 1) return;
        setDataId(prev=>prev-1);
    }

    const onNextClick = () => {
        if(dataId >= 12) return;
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
                <Button color='orange' outline onClick={onPrevClick}>이전</Button>
                <Button color='orange' outline onClick={onNextClick}>다음</Button>
            </CuntrolBox>
        </SurveyPage>

    )
}
export default Survey