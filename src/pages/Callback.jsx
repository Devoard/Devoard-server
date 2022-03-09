import { useEffect } from 'react';

function getCookie(key) {
  let result = null;
  let cookie = document.cookie.split(';');

  cookie.some((item) => {
    item = item.replace(' ', '');

    let dic = item.split('=');

    if (key === dic[0]) {
      result = dic[1];
      return true;
    }
    return false;
  });

  return result;
}

const Callback = () => {
  useEffect(() => {
    try {
      const jwt = getCookie('git_token');
      const url = getCookie('git_userImg');

      console.log(jwt, url);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <></>
  )
};

export default Callback;