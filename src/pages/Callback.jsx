import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import qs from 'qs';

const Callback = ({ location }) => {
  const authUri = ``;

  useEffect(() => {
    const getToken = async () => {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      try {
        const res = await fetch(`${authUri}?code=${code}`);
        const data = await res.json();

        localStorage.setItem('token', data.jwt);
        localStorage.setItem('ProfileURL', data.avatar_url);

        return <Navigate to="/" replace={true} />
      } catch (error) {}
    };

    getToken();
  });

};

export default Callback;