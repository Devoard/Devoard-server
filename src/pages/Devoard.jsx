import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';

const Devoard = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setActivePage('devoard'));
  }, [setActivePage])

  return (
    <></>
  )
}

export default Devoard;