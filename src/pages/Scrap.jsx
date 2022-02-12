import { useEffect, useContext } from 'react';
import { UserContext } from '../context/user';

const Scrap = () => {
  const { setActivePage } = useContext(UserContext);

  useEffect(()=>{
    setActivePage('scrap');
  }, [setActivePage])

  return (
    <></>
  )
}

export default Scrap;