import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Button';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';

const App = () => {
  return (
    <main>
      {/* <NavBar /> */}
      <Container>
        <Routes>
          <Route />
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/favorite" element={<Favorite />} /> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </main>
  );
}

export default App;