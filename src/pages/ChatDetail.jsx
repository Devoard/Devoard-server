import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PopUp from '../components/PopUp';

const ListBox = styled.div`
    overflow-y:scroll; 
    height: 80%;
    width: 88%;
`;
const ChatItem = styled.div`
    position: relative;
    width: 100%;
    font-size: 18px;
    border: 1px solid transparent;
    border-bottom: 1px solid #ACACAC;
    margin: 20px 0;
    &:before{
        content: "${props=>props.desc}";
        color: ${props=>props.desc==='보낸 쪽지'?'var(--color-orange)':'#6CD370'};
        font-weight: 600;
        display: block;
        position: absolute;
        top: 0;
    }
    &:after{
        content: "${props=>props.date}";
        position: absolute;
        right: 6px;
        font-size: 16px;
        top: 0;
    }
`;
const Content = styled.p`
    margin: 34px 0 10px;
`;

const ChatDetail = ({setDetailOpen, detailOpen}) => {
    const dispatch = useDispatch();
    // const {detailChat} = useSelector(state=>state.chat);
    useEffect(()=>{
        // dispatch(view_detail_chat(user));
    },[]);
    return (
        <PopUp width={'60%'} height={'80%'} isVisible={detailOpen} setIsLoginPopUp={setDetailOpen}>
            <ListBox>
            <ChatItem desc={'받은 쪽지'} date={'2022-02-10 11:19'}>
            <Content>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</Content>
            </ChatItem>
            <ChatItem desc={'보낸 쪽지'} date={'2022-02-10 11:19'}>
            <Content>안녕하세요?</Content>
            </ChatItem>
            <ChatItem desc={'보낸 쪽지'} date={'2022-02-10 11:19'}>
            <Content>안녕하세요?</Content>
            </ChatItem>
            <ChatItem desc={'받은 쪽지'} date={'2022-02-10 11:19'}>
            <Content>안녕하세요?</Content>
            </ChatItem>
            <ChatItem desc={'보낸 쪽지'} date={'2022-02-10 11:19'}>
            <Content>안녕하세요?</Content>
            </ChatItem>
            <ChatItem desc={'받은 쪽지'} date={'2022-02-10 11:19'}>
            <Content>안녕하세요?</Content>
            </ChatItem>
            <ChatItem desc={'보낸 쪽지'} date={'2022-02-10 11:19'}>
            <Content>안녕하세요?</Content>
            </ChatItem>
            <ChatItem desc={'받은 쪽지'} date={'2022-02-10 11:19'}>
            <Content>안녕하세요?</Content>
            </ChatItem>
            <ChatItem desc={'받은 쪽지'} date={'2022-02-10 11:19'}>
            <Content>안녕하세요?</Content>
            </ChatItem>
            </ListBox>
        </PopUp>
    );
};

export default ChatDetail;