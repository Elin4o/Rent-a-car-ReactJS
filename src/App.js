import './App.scss';
import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router';
import { UsersList } from './components/users/users-list/UsersList';
import { UserForm } from './components/users/user-form/UserForm';
import { Login } from './components/auth/login/Login';
import { NonAuthenticatedRoute } from './utils/guards/NonAuthenticatedRoute';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { Register } from './components/auth/register/Register';
import { CarsList } from './components/cars/car-list/CarList';
import { CarForm } from './components/cars/car-form/CarForm';
import { RentalForm } from './components/rentals/rental-form/RentalForm';
import { RentalsList } from './components/rentals/rentals-list/RentalsList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<NonAuthenticatedRoute> <Login /> </NonAuthenticatedRoute>} />
        <Route path="/register" element={<NonAuthenticatedRoute> <Register /> </NonAuthenticatedRoute>} />
        <Route path="/" element={<AuthenticatedRoute> <Layout /> </AuthenticatedRoute>} >
          <Route path="users" element={<UsersList />} />
          <Route path="users/create" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />

          <Route path="cars" element={<CarsList />} />
          <Route path="cars/create" element={<CarForm />} />
          <Route path="cars/edit/:id" element={<CarForm />} />
          
          <Route path="rentals" element={<RentalsList />} />
          <Route path="rentals/:id" element={<RentalsList />} />
          <Route path="rentals/create" element={<RentalForm />} />


        </Route>
      </Routes>
    </div>
  );
}

export default App;
