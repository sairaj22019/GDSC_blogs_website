import Header from "./Components/Header"
import Layout from "./Components/Layout"
import Post from "./Components/Post"
import {Route , Routes} from "react-router-dom"
import IndexPage from "./Pages/IndexPage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import { UserContextProvider } from "./UserContext"
import CreatePost from "./Pages/CreatePost"
import Postpage from "./Pages/Postpage"

function App() {


  return (
    <UserContextProvider>
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />}/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create" element={<CreatePost />}/>
              <Route path="/post/:id" element={<Postpage />}/>

          </Route>
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
