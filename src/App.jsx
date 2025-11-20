import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import StatsPage from './pages/StatsPage.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
<Router>
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/code/:code" element={<StatsPage />} />
    </Route>
  </Routes>
</Router>

  );
}

export default App;

