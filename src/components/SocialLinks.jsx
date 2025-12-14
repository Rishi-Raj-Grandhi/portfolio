const SocialLinks = () => {
  const socials = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/rishi-raj-grandhi', icon: '💼' },
    { name: 'GitHub', url: 'https://github.com/Rishi-Raj-Grandhi', icon: '💻' },
    { name: 'Email', url: 'mailto:rishi.phani.grandhi@gmail.com', icon: '📧' },
  ]

  return (
    <section id="connect" className="social-section">
      <h2 className="section-title">CONNECT</h2>
      <div className="social-links">
        {socials.map((social, idx) => (
          <a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link pixel-button"
          >
            <span className="social-icon">{social.icon}</span>
            <span>{social.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default SocialLinks

