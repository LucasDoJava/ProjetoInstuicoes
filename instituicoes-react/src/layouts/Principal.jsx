import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Principal.css';

const Principal = () => {
  return (
    <div className="App">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Principal;
