import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {IKImage,IKContext,IKUpload} from 'imagekitio-react'
import AddImagesGallery from './component/AddImagesGallery'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AddProject from './pages/AddProject'
import NavBar from './component/NavBar'
import Projects from './pages/Projects'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import { toast, ToastContainer } from 'react-toastify'

  // toast notification
  export const updateNotification = (message, action) =>
   toast[action](message, {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "colored",
   });

   export const MutationContext = createContext()

function App() {
    const [onMutation,setOnmutation] = useState(0)
 
  
  return (
    <>
    <MutationContext.Provider value={{onMutation, setOnmutation}}>
       <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addproject' element={<AddProject/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/project/:id' element={<ProjectDetails/>}/>
        </Routes>      
      </BrowserRouter>    
    </MutationContext.Provider>
    </>
  )
}

export default App
