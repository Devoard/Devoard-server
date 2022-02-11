import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Layout from './components/Layout';
import Alert from './pages/Alert';
import Chat from './pages/Chat';
import Scrap from './pages/Scrap';
import MyProject from './pages/MyProject';
import MyPage from './pages/MyPage';
import Devoard from './pages/Devoard';
import Callback from './pages/Callback';
import Survey from './pages/Survey';
import NotFound from './pages/NotFound';
import ChatList from './pages/ChatList';

const App = () => {
  const { loggedIn } = useSelector(state => state.user);

  return (
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
              {loggedIn ? <Route path="/survey" element={<Survey />} /> : ""}
              <Route path="/callback" element={<Callback />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/chat_list" element={<ChatList />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </div>
  );
}

export default App;