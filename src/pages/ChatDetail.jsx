import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PopUp from '../components/PopUp';

const ListBox = styled.div`
    // border: 1px solid red;
    overflow-y:scroll; 
    height: 80%;
    width: 90%;
`;
const ChatItem = styled.div`
    position: relative;
    width: 100%;
    font-size: 18px;
    border-bottom: 1px solid #ACACAC;
    padding: 10px 0;
    margin: 10px 0;
`;
const Content = styled.p`
    &:before{
        content: "${props=>props.desc}";
        color: ${props=>props.desc==='보낸 쪽지'?'var(--color-orange)':'#6CD370'};
        font-weight: 600;
        display: block;
        margin: 8px 0;
    }
    &:after{
        content: "${props=>props.date}";
        position: absolute;
        right: 40px;
        font-size: 16px;
        top: 10px; 
    }
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
            <ChatItem>
            <Content desc={'받은 쪽지'} date={'2022-02-10 11:19'}>안녕하세요?</Content>
            </ChatItem>
            <ChatItem>
            <Content desc={'보낸 쪽지'}>안녕하세요?</Content>
            </ChatItem>
            <ChatItem>
            <Content desc={'보낸 쪽지'}>안녕하세요?</Content>
            </ChatItem>
            <ChatItem>
            <Content desc={'받은 쪽지'}>안녕하세요?</Content>
            </ChatItem>
            <ChatItem>
            <Content desc={'보낸 쪽지'}>안녕하세요?</Content>
            </ChatItem>
            <ChatItem>
            <Content desc={'받은 쪽지'}>안녕하세요?</Content>
            </ChatItem>
            <ChatItem>
            <Content desc={'보낸 쪽지'}>안녕하세요?</Content>
            </ChatItem>
            <ChatItem>
            <Content desc={'받은 쪽지'}>안녕하세요?</Content>
            </ChatItem>
            <ChatItem>
            <Content desc={'받은 쪽지'}>안녕하세요?</Content>
            </ChatItem>
            </ListBox>
        </PopUp>
    );
};

export default ChatDetail;