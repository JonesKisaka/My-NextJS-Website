import ThemeToggle from './ThemeToggle'
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-menu">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
} 