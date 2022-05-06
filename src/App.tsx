import Home from './pages/Home';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import { GlobalStyle } from './GlobalStyle';
import EndpointsProvider from './Hooks/useEndpoints';

function App() {
  return (
    <BrowserRouter>
      <EndpointsProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="users" element={<UserListPage />} />
        </Routes>
      </EndpointsProvider>
    </BrowserRouter>
  );
}

export default App;
