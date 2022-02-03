import { useEffect, useContext } from 'react';
import { UserContext } from '../context/user';

const Devoard = () => {
  const { setActivePage } = useContext(UserContext);

  useEffect(()=>{
    setActivePage('devoard');
  }, [setActivePage])

  return (
    <></>
  )
}

export default Devoard;