import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';

const Devoard = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setActivePage('devoard'));
  }, [setActivePage])

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