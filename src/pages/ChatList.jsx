import React, {useState} from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import Title from '../components/Title';

const ListBox = styled.div`
    width: 65%;
    margin: 40px auto;
`;
const ChatItem = styled.div`
    font-size: 20px;
    display: flex;
    color: ${props=>props.isRead?'#A0A0A0;':'var(--color-orange)'};
    border-bottom: 1px solid #fff;
    padding: 10px;
    margin-bottom: 10px;
    &:before{
        content: "ㅁ";
        color: #fff;
        margin-right: 10px;
    }
`;
const FromId = styled.p`
    width: 20%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  

`;
const Content = styled.p`
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  
    margin: 0 26px;
`;
const Date = styled.p`
    width: 20%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  
`;
const PageControl = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ControlBtn = styled.button`
    color: #fff;
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;

    &:hover{
        color: #ddd;
    }
`;
const ChatList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const page_num = 5;  //페이지 숫자 개수 ◀ 1 2 3 ▶
    const message_num = 12;  //한페이지에 보여질 쪽지수
    const messages = [
        {from: '사용자1사용자1사용자1사용자1', 
        content: '지수님 안녕하세요지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: true},
        {from: '사용자2', 
        content: '지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자3', 
        content: '성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자4', 
        content: '다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자5', 
        content: '지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: true},
        {from: '사용자6', 
        content: '지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자7', 
        content: '성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자8', 
        content: '다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자9', 
        content: '지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: true},
        {from: '사용자10', 
        content: '지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자11', 
        content: '성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자12', 
        content: '다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자13', 
        content: '지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: true},
        {from: '사용자14', 
        content: '지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자15', 
        content: '성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자16', 
        content: '다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자17', 
        content: '지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: true},
        {from: '사용자18', 
        content: '지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자19', 
        content: '성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자사용자20', 
        content: '다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        
    ]
    const page = Math.ceil(messages.length / message_num);  //총 페이지 수

    useEffect(()=>{
        for(let i=1; i<=page; i++){
            setPages(prev=>prev.concat([i]));
            if(i>=3) return;
        }
    },[]);
    
    const onPageChange = (e) => {
        setCurrentPage(e.target.innerHTML);
    }

    const onPrev = ()=>{
        if(pages[0]===1) return;
        let arr = [];
        let i = pages[pages.length-1]-pages.length;
        while(arr.length<page_num){
            arr.push(i);
            i--;
        }
        setPages(arr.reverse());
    }

    const onNext = ()=>{
        if(pages[pages.length-1]>=page) return;
        let arr = [];
        for(let i=pages[pages.length-1]+1; i<=page; i++){
            if(arr.length<page_num) arr.push(i)
        }
        setPages(arr);
    }
    return (
        <>
            <Title>쪽지함</Title>
            <ListBox>
                {messages.map((v, i)=>{
                     if(i+1>(currentPage-1)*message_num && i+1<=(currentPage * message_num)){
                         return(
                            <ChatItem isRead={v.isRead} key={i}>
                                <FromId>{v.from}</FromId>
                                <Content>{v.content}</Content>
                                <Date>{v.date}</Date>
                            </ChatItem>
                         )
                     }
                    })}
            </ListBox>
            <PageControl>
                <ControlBtn onClick={onPrev}>◀</ControlBtn>
                {pages.map((v, i)=><ControlBtn key={i} onClick={onPageChange}>{v}</ControlBtn>)}
                <ControlBtn onClick={onNext}>▶</ControlBtn>
            </PageControl> 
        </>
    );
};

export default ChatList;