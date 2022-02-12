import { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom';
import LoginPopUp from '../components/LoginPopUp';
import ToggleMenu from '../components/ToggleMenu';
import {
  HeaderWrapper,
  StaticMenuWrapper,
  Logo,
  ProjectMenu,
  UserMenuWrapper,
  UserIcon,
  LoginBtn,
  AlertBtn,
  ChatBtn
} from '../styles/Header'

const Header = () => {
  const [isLoginPopUp, setIsLoginPopUp] = useState(false);
  const [isToggleMenuPopUp, setIsToggleMenuPopUp] = useState(false);
  const { loggedIn, loggedUser, activePage, setActivePage } = useContext(UserContext);
  const userIcon = useRef(null);

  useEffect(()=>{
    const handleCloseMenu = (e) => {
      if (!isToggleMenuPopUp && (userIcon.current === e.target)){
        setIsToggleMenuPopUp(true);
      }
    }

    window.addEventListener('mousedown', handleCloseMenu);

    return () => {
      window.removeEventListener('mousedown', handleCloseMenu);
    }
  }, [isToggleMenuPopUp]);

  return (
    <>
      <HeaderWrapper>
        <StaticMenuWrapper>
          <Link to='/' style={{textDecoration: 'none'}}>
            <Logo>Devoard</Logo>
          </Link>
          <Link to='/devoard' style={{textDecoration: 'none'}}>
            <ProjectMenu>프로젝트</ProjectMenu>
          </Link>
        </StaticMenuWrapper>
        <UserMenuWrapper>
          {loggedIn ? 
          (<>
          <Link to="/chat/list">
            <ChatBtn 
              color={activePage === 'chat' ? '#FFB200' : 'white'}
              size='30'
            />
          </Link>
          <Link to="/alert">
            <AlertBtn 
              color={activePage === 'alert' ? '#FFB200' : 'white'}
              size='32'
            />
          </Link>
          <UserIcon 
            ref={userIcon}
            src={loggedUser.imageUrl}
          />
          </>) :
          (<LoginBtn
            color='orange'
            outline
            onClick={()=>setIsLoginPopUp(true)}
          >
            로그인
          </LoginBtn>)}
        </UserMenuWrapper>
        <ToggleMenu
          isVisible={isToggleMenuPopUp}
          setIsVisible={setIsToggleMenuPopUp}
          changeActiveBtn={setActivePage}
        />
      </HeaderWrapper>

      <LoginPopUp
        loggedIn={loggedIn}
        isVisible={isLoginPopUp}
        setIsLoginPopUp={setIsLoginPopUp}
      >
      </LoginPopUp>
    </>
  );
}

export default Header;