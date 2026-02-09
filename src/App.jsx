import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Directory from './pages/directory';
import Auth from './pages/auth';
import ShopProfile from './pages/shopProfile';
import AddShop from './pages/addShop';
import EditShop from './pages/editShop';
import AdminDashboard from './pages/admin';
import Logout from './components/logout';
import Layout from './components/Layout';
import { ToastContainer, Flip } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/shop/:id" element={<ShopProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-shop" element={<AddShop />} />
          <Route path="/edit-shop/:id" element={<EditShop />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </>
  );
}

export default App;
