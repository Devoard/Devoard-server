import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Question = styled.h1`
    color: #fff;
`;

const Answer = styled.p`
    background: ${props=>props.select?'var(--color-orange)':'#fff'};
    border-radius: 10px;
    width: 100%;
    padding: 10px;
    font-size: 20px;
    box-sizing: border-box; 
    cursor: pointer;
    transition: 0.3s;
    &:hover{
        background: var(--color-orange);
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 300px;
    border-radius: 20px;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
`;

const SurveyComp = ({data, firstAnswer, setFirstAnswer}) => {
    const [select, setSelect] = useState('');
    const [selectArr, setSelectArr] = useState([]);
    const onFirstAnswer = (e) => {
        setFirstAnswer(e.target.innerHTML);
        setSelect(e.target.innerHTML);
    };
    const onSelect = (e) =>{
        setSelect(e.target.innerHTML);
    }
    const onSelectMulti = (e)=>{
        setSelectArr(prev=>prev.concat(e.target.innerHTML));
    }
    return(
        <>
            <Question>{data.q}</Question>
            
            {data.id === 1 && data.a.map((v, i)=>{
                if(select===v) return <Answer key={i} select={true} onClick={onFirstAnswer}>{v}</Answer>
                else return <Answer key={i} onClick={onFirstAnswer}>{v}</Answer>})}

            {(data.id === 2 && data.a[firstAnswer]) && data.a[firstAnswer].map((v,i)=>{
                if(selectArr.includes(v)) return <Answer key={i} select={true} onClick={onSelectMulti}>{v}</Answer>
                else return <Answer key={i} onClick={onSelectMulti}>{v}</Answer>
            })}
            
            {(data.id > 2 && data.a)&& data.a.map((v, i)=>{
                if(select===v) return <Answer key={i} select={true} onClick={onSelect}>{v}</Answer>
                else return <Answer key={i} onClick={onSelect}>{v}</Answer>
            })}
            
            {(data.id > 2 && !data.a)&&<TextArea />}
        </>
    )
}
export default SurveyComp;