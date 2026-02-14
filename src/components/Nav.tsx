import { Link } from 'react-router-dom'

const BRAND_COLOR = '#c43333'

export function Nav() {
  return (
    <header
      style={{
        backgroundColor: '#c43333',
        padding: '0.5rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'white',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '1.1rem',
        }}
      >
        <img
          src="/ErrorScript.png"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            backgroundColor: BRAND_COLOR,
            borderRadius: 4,
            color: 'white',
            fontWeight: 700,
            fontSize: '0.9rem',
          }}
        />
        ErrorScript
      </Link>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link
          to="/play"
          style={{
            color: BRAND_COLOR,
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Playground
        </Link>
      </nav>
    </header>
  )
}
