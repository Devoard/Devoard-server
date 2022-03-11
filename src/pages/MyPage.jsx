import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../modules/user';
import defaultUserImg from '../assets/images/defaultUserImg.png';
import {
  PageWrapper,
  Background,
  UserImgWrapper,
  UserImg,
  ImgInput,
  UploadButton,
  DeleteButton
} from '../styles/MyPage';

const MyPage = () => {
  const [files, setFiles] = useState('');
  const imgInput = useRef();
  const { loggedUser } = useSelector(state=>state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePage('my_page'));
  }, [setActivePage])

  useEffect(() => {
    setFiles(loggedUser.imageUrl);
  }, [loggedUser]);

  const onLoadImg = (e) => {
    setFiles(URL.createObjectURL(e.target.files[0]));
  }

  const onDeleteImg = () => {
    URL.revokeObjectURL(files);
    setFiles(defaultUserImg);
  }


  return (
    <PageWrapper>
      <Background>
        <UserImgWrapper>
          {files &&
          <UserImg 
            src={files} 
            alt='user_img' 
          />}
          <ImgInput 
            ref={imgInput}
            type="file"
            id="userImg"
            accept="image/*"
            onChange={onLoadImg}
          />
          <UploadButton
            color="orange"
            onClick={() => {imgInput.current.click()}}
          >
            이미지 선택하기
          </UploadButton>
          <DeleteButton
            outline
            color="gray"
            onClick={onDeleteImg}
          >
            선택된 이미지 삭제하기
          </DeleteButton>
        </UserImgWrapper>
      </Background>
    </PageWrapper>
  )
}

export default MyPage;