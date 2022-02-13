const DETAIL_CHAT = 'chat/DETAIL_CHAT';


export const view_detail_chat = (user) => {
    // 한 사용자와 쪽지 주고받은걸 배열로 넣어서 payload에 
    return {
        type: DETAIL_CHAT,
    }
}
const initialState = {
    allChat: [
        {from: '사용자1사용자1사용자1사용자1', 
        content: '지수님 안녕하세요지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: true},
        {from: '사용자2', 
        content: '지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자2', 
        content: '성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?', 
        date: '2022-02-10 11:19',
        isRead: false},
        {from: '사용자2', 
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
    ],
    detailChat: [],
}
export default function chatReducer(state=initialState, action){
    switch(action.type){
        case DETAIL_CHAT:
            return {...state, detailChat: action.payload}
        default: 
            return state;
    }
}

