// import './App.css'

import User from "./components/user/User"

import router from "./Router";
import {RouterProvider} from "react-router";



function App() {

  return (
    <>
     <User />
     <RouterProvider router={router} />

    </>
  )
}

export default App
