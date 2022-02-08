import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setActivePage('chat'));
  }, [setActivePage])

  return (
    <></>
  )
}

export default Chat;