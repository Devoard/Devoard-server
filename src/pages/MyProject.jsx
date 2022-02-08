import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';

const MyProject = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setActivePage('my_project'));
  }, [setActivePage])

  return (
    <></>
  )
}

export default MyProject;