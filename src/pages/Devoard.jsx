import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
//import PostAPI from '../api/PostAPI';
import { setActivePage } from '../modules/user';
import ProjectDetail from '../components/ProjectDetail';
import WriteBtn from '../components/WriteBtn';
import {
  DevoardWrapper,
  DevoardTitle,
  SortingWrapper,
  ComboBox,
  SelectedText,
  DownIcon,
  ProjectWrapper,
  MenuWrapper,
  Menu,
  Search,
  SearchInput,
  SearchIcon
} from '../styles/Devoard';

const Devoard = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("전체 보기");
  const comboBox = useRef(null);
  const menuWrapper = useRef(null);

  useEffect(()=>{
    dispatch(setActivePage('devoard'));
    
    const handleCloseMenu = (e) => {
      if (!isMenuOpen) {
        if (comboBox.current.contains(e.target))
          setIsMenuOpen(true);
      }
      else {
        if (menuWrapper.current.contains(e.target))
          setSelectedMenu(e.target.attributes.getNamedItem("data-value").value);
        setIsMenuOpen(false);
      } 
    }

    const getPosts = () => {
      axios.get("http://localhost:8000/posts")
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    }

    window.addEventListener('mousedown', handleCloseMenu);
    getPosts();

    return () => {
      window.removeEventListener('mousedown', handleCloseMenu);
    }
  }, [setActivePage, isMenuOpen])


  return (
    <DevoardWrapper>
      <DevoardTitle>현재 모집 중인 프로젝트</DevoardTitle>
      <SortingWrapper>
        <ComboBox
          ref={comboBox}
        >
          <SelectedText>
            {selectedMenu}
          </SelectedText>
          {isMenuOpen &&
            <MenuWrapper
              ref={menuWrapper}
            >
              <Menu data-value="전체 보기">전체 보기</Menu>
              <Menu data-value="모집 중">모집 중</Menu>
              <Menu data-value="모집 완료">모집 완료</Menu>
            </MenuWrapper>}
          <DownIcon />
        </ComboBox>
        <Search>
          <SearchInput />
          <SearchIcon color='black' size='24'/>
        </Search>
      </SortingWrapper>
      <ProjectWrapper>
        {posts && posts.map(post => (
          <ProjectDetail 
            key={post.id}
            projectTitle={post.title}
            projectText={post.body}
            tags={post.tags}
            recruitState={post.recruitState}
          />
        ))}
      </ProjectWrapper>
      <Link to='/write' style={{ color: '#333333' }}>
        <WriteBtn />
      </Link>
    </DevoardWrapper>
  )
}

export default Devoard;