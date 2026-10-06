
import { use } from 'react'
import './App.css'
import { AuthContext } from './context/AuthContext'
import Loader from './components/Loader/Loader';
import { RouterProvider } from 'react-router';
import router from './routes/Router/Router';


function App() {
  const{loading}=use(AuthContext);

if(loading){
  return <Loader></Loader>
}
return <RouterProvider router={router}></RouterProvider>
}

export default App
