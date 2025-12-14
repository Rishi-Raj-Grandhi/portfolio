const Navigation = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
  }

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' },
    { id: 'connect', label: 'CONNECT' },
  ]

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="nav-link"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navigation

