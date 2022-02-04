import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import UserProvider from './context/user';
import Home from './pages/Home';
import Layout from './components/Layout';
import Alert from './pages/Alert';
import Chat from './pages/Chat';
import Scrap from './pages/Scrap';
import MyProject from './pages/MyProject';
import MyPage from './pages/MyPage';
import Devoard from './pages/Devoard';
import Callback from './pages/Callback';
import NotFound from './pages/NotFound';
import Survey from './pages/Survey';

const App = () => {
  return (
    <UserProvider>
      <div className="App">
        <ThemeProvider
          theme={{
            palette: {
              orange: '#FFB200'
            }
          }}
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/list" element={<Chat />} />
              <Route path="/alert" element={<Alert />} />
              <Route path="/scrap" element={<Scrap />} />
              <Route path="/my_project" element={<MyProject />} />
              <Route path="/my_page" element={<MyPage />} />
              <Route path="/devoard" element={<Devoard />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/survey" element={<Survey />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </div>
    </UserProvider>
  );
}

export default App;
