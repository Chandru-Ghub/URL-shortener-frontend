import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function Layout({ children }) {
 return (
    <div className="min-h-screen flex flex-col bg-[#031f39]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
}

