import { useEffect, useState } from "react";
import styled from "styled-components";

const Question = styled.h1`
    color: #fff;
`;

const Answer = styled.p`
    background: #fff;
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


    const onFirstAnswer = (e) => {
        setFirstAnswer(e.target.innerHTML);
    };
    return(
        <>
            <Question>{data.q}</Question>
            {data.id === 1 && data.a.map((v, i)=><Answer key={i} onClick={onFirstAnswer}>{v}</Answer>)}
            {(data.id === 2 && data.a[firstAnswer]) && data.a[firstAnswer].map((v,i)=><Answer key={i}>{v}</Answer>)}
            {(data.id > 2 && data.a)&& data.a.map((v, i)=><Answer key={i} >{v}</Answer>)}
            {(data.id > 2 && !data.a)&&<TextArea />}
        </>
    )
}
export default SurveyComp;