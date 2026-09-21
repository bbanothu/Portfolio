import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Experience from './pages/Experience.jsx'
import Skills from './pages/Skills.jsx'
import Contact from './pages/Contact.jsx'

const PAGES = {
  '/': { title: 'Home', file: 'home.md', element: <Home /> },
  '/experience': { title: 'Experience', file: 'experience.md', element: <Experience /> },
  '/skills': { title: 'Skills', file: 'skills.md', element: <Skills /> },
  '/contact': { title: 'Contact', file: 'contact.md', element: <Contact /> },
}

export default function App() {
  return (
    <Routes>
      {Object.entries(PAGES).map(([path, page]) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout title={page.title} file={page.file}>
              {page.element}
            </Layout>
          }
        />
      ))}
    </Routes>
  )
}
