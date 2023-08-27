import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate
} from "react-router-dom";



import Home from "./pages/Home";
import Login from "./pages/Login";
import Regi from "./pages/Regi";
import Term from "./pages/Term";
import User from "./pages/User";
import P404 from "./pages/P404";
import Admin from "./pages/Admin";

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route>
        
        <Route exact  path="/" element={<Regi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/term" element={<Term/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="*" element={<Navigate to="/login"/>} />
       
      </Route>
     
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
