import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './components/Publish'
import { Userblogs } from './pages/Userblogs'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/" element={<Blogs />} />
          <Route path="/userblog" element={<Userblogs />} />
          <Route path="/blogs/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App