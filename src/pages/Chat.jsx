import { useEffect, useContext } from 'react';
import { UserContext } from '../context/user';

const Chat = () => {
  const { setActivePage } = useContext(UserContext);

  useEffect(()=>{
    setActivePage('chat');
  }, [setActivePage])

  return (
    <></>
  )
}

export default Chat;