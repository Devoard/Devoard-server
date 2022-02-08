import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';

const Scrap = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setActivePage('scrap'));
  }, [setActivePage])

  return (
    <></>
  )
}

export default Scrap;