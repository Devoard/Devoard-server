import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';

const Alert = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setActivePage('alert'));
  }, [setActivePage])

  return (
    <></>
  )
}

export default Alert;