import { useEffect, useContext } from 'react';
import { UserContext } from '../context/user';

const Alert = () => {
  const { setActivePage } = useContext(UserContext);

  useEffect(()=>{
    setActivePage('alert');
  }, [setActivePage])

  return (
    <></>
  )
}

export default Alert;