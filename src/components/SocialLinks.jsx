const SocialLinks = () => {
  const socials = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile', icon: '💼' },
    { name: 'Twitter', url: 'https://twitter.com/yourhandle', icon: '🐦' },
    { name: 'Instagram', url: 'https://instagram.com/yourhandle', icon: '📷' },
  ]

  return (
    <section className="social-section">
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

