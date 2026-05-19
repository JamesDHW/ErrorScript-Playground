import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { APP_ROOT_SHELL_CLASS } from './appSurface'
import { Nav } from './components/Nav'
import { AboutPage } from './pages/AboutPage'
import { DocsPage } from './pages/DocsPage'
import { HomePage } from './pages/HomePage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { SlidesPage } from './pages/SlidesPage'

export function App() {
  const { pathname } = useLocation()
  const hideNav = pathname.startsWith('/slides')

  return (
    <div className={APP_ROOT_SHELL_CLASS}>
      {!hideNav ? <Nav /> : null}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/slides" element={<Navigate to="/slides/0" replace />} />
          <Route path="/slides/:slideIndex" element={<SlidesPage />} />
        </Routes>
      </div>
    </div>
  )
}
