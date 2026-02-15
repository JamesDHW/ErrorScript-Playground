import { Link } from 'react-router-dom'

export function Nav() {
  return (
    <header className="flex items-center justify-between bg-brand px-3 py-2 sm:px-6">
      <Link
        to="/"
        className="flex items-center gap-2 text-white no-underline font-semibold text-base min-w-0 sm:text-lg"
      >
        <img
          src="/ErrorScript.png"
          alt=""
          className="shrink-0 inline-flex items-center justify-center w-7 h-7 bg-brand rounded"
        />
        <span className="truncate">ErrorScript</span>
      </Link>
      <nav className="flex items-center gap-3 shrink-0 sm:gap-6">
        <Link to="/play" className="text-brand no-underline font-medium text-sm sm:text-base">
          Playground
        </Link>
        <Link to="/about" className="text-white no-underline font-medium text-sm sm:text-base">
          About
        </Link>
      </nav>
    </header>
  )
}
