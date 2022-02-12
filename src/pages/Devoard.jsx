import { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../context/user';
import ProjectDetail from '../components/ProjectDetail';
import {
  DevoardWrapper,
  DevoardText,
  SortingWrapper,
  ComboBox,
  SelectedText,
  DownIcon,
  ProjectWrapper,
  MenuWrapper,
  Menu
} from '../styles/Devoard';


const Devoard = () => {
  const { setActivePage } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("전체 보기");
  const comboBox = useRef(null);
  const menuWrapper = useRef(null);

  useEffect(()=>{
    setActivePage('devoard');
    
    const handleCloseMenu = (e) => {
      if (!isMenuOpen && comboBox.current.contains(e.target))
        setIsMenuOpen(true);
      else if(isMenuOpen && comboBox.current.contains(e.target)){
        if (menuWrapper.current.contains(e.target))
          setSelectedMenu(e.target.attributes.getNamedItem("data-value").value);
        setIsMenuOpen(false);
      } 
    }

    window.addEventListener('mousedown', handleCloseMenu);

    return () => {
      window.removeEventListener('mousedown', handleCloseMenu);
    }
  }, [setActivePage, isMenuOpen])

 

  return (
    <DevoardWrapper>
      <DevoardText>현재 모집 중인 프로젝트</DevoardText>
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
      </SortingWrapper>
      <ProjectWrapper>
        <ProjectDetail 
          recruitState={true}
          projectTitle="Title"
          tagName="tags"
        />
        <ProjectDetail 
          recruitState={true}
          projectTitle="Title"
          tagName="tags"
        />
        <ProjectDetail 
          recruitState={true}
          projectTitle="Title"
          tagName="tags"
        />
        <ProjectDetail 
          recruitState={true}
          projectTitle="Title"
          tagName="tags"
        />
        <ProjectDetail 
          recruitState={true}
          projectTitle="Title"
          tagName="tags"
        />
        <ProjectDetail 
          recruitState={true}
          projectTitle="Title"
          tagName="tags"
        />
        <ProjectDetail 
          recruitState={true}
          projectTitle="Title"
          tagName="tags"
        />
        <ProjectDetail 
          recruitState={true}
          projectTitle="Title"
          tagName="tags"
        />
        <ProjectDetail 
          recruitState={true}
          projectTitle="Title"
          tagName="tags"
        />
      </ProjectWrapper>
    </DevoardWrapper>
  )
}

export default Devoard;