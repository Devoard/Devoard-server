import { useEffect, useContext } from 'react';
import { UserContext } from '../context/user';

const MyPage = () => {
  const { setActivePage } = useContext(UserContext);

  useEffect(()=>{
    setActivePage('my_page');
  }, [setActivePage])

  return (
    <></>
  )
}

export default MyPage;