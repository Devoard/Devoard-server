import { useEffect, useContext } from 'react';
import { UserContext } from '../context/user';

const MyProject = () => {
  const { setActivePage } = useContext(UserContext);

  useEffect(()=>{
    setActivePage('my_project');
  }, [setActivePage])

  return (
    <></>
  )
}

export default MyProject;