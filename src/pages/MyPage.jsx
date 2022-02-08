import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';
const MyPage = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setActivePage('my_page'));
  }, [setActivePage])

  return (
    <></>
  )
}

export default MyPage;