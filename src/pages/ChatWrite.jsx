import { darken, lighten } from 'polished';
import React, { useState } from 'react';
import styled from 'styled-components';
import PopUp from '../components/PopUp';

const Form = styled.form`
    width: 80%;
    height: 70%;
`;
const Content = styled.textarea`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #ACACAC;
    border-radius: 20px;
    padding: 22px 16px;
    font-size: 18px;
`;
const Div = styled.div`
    width: 80%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;
const Title = styled.h2`
    
`;
const SubmitBtn = styled.button`
    border: none;
    background: var(--color-orange);
    padding: 8px 16px;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
`;

const ChatWrite = ({writeOpen, setWriteOpen}) => {
    const [content, setContent] = useState('');
    const onChange = e => {
        setContent(e.target.value);
    }
    const onSubmit = ()=>{
        alert('쪽지를 전송했습니다.');
        setContent('');
    }
    return (
        <PopUp width={'60%'} height={'80%'} isVisible={writeOpen} setIsLoginPopUp={setWriteOpen}>
            <Div>
                <Title>쪽지 작성</Title>
                <SubmitBtn onClick={onSubmit}>전송</SubmitBtn>
            </Div>
            <Form>
                <Content value={content} onChange={onChange}/>
            </Form>
        </PopUp>
    );
};

export default ChatWrite;