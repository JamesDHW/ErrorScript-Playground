import { Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { AboutPage } from './pages/AboutPage'
import { DocsPage } from './pages/DocsPage'
import { HomePage } from './pages/HomePage'
import { PlaygroundPage } from './pages/PlaygroundPage'

export function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  )
}
