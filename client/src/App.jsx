import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './layout/Navbar';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login';
import Dashboard from './pages/admin/dashboard/Dashboard';
import AddMovie from './pages/admin/dashboard/movies/new/AddMovie';
import EditMovie from './pages/admin/dashboard/movies/edit/EditMovie';
import AddScreen from './pages/admin/dashboard/screens/new/AddScreen';
import EditScreen from './pages/admin/dashboard/screens/edit/EditScreen';
import AddFoodItem from './pages/admin/dashboard/fooditems/new/AddFoodItem';
import EditFoodItem from './pages/admin/dashboard/fooditems/edit/EditFoodItem';
import Private from './special/Private';
import Screen from './pages/screens/id/Screen';

function App() {
  return (
    <main className='bg-zinc-800 h-screen text-zinc-200'>
      <Router>
        <Toaster richColors position="top-center" theme='dark' />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* admin action routes */}
          <Route path="/admin" element={<Private Component={Admin} />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* movies */}
          <Route path="/admin/dashboard/movies/new" element={<Private Component={AddMovie} />} />
          <Route path="/admin/dashboard/movies/:id" element={<Private Component={EditMovie} />} />

          {/* screens */}
          <Route path="/admin/dashboard/screens/new" element={<Private Component={AddScreen} />} />
          <Route path="/admin/dashboard/screens/:id" element={<Private Component={EditScreen} />} />

          {/* screens */}
          <Route path="/admin/dashboard/food-items/new" element={<Private Component={AddFoodItem} />} />
          <Route path="/admin/dashboard/food-items/:id" element={<Private Component={EditFoodItem} />} />

          {/* <Route path="/projects/:id/gallery" element={<Protected Component={Gallary} />} /> */}

          <Route path="/screens/:id" element={<Screen />} />

        </Routes>
      </Router>
    </main>
  );
}

export default App;