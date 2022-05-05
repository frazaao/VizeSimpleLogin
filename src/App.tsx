import Home from './pages/Home';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import { GlobalStyle } from './GlobalStyle';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="users" element={<UserListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
