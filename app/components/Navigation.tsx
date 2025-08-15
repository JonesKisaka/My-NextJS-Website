import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-menu">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
} 