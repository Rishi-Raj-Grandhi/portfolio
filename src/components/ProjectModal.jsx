const ProjectModal = ({ project, onClose }) => {
  if (!project) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content pixel-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{project.title}</h2>
        <p className="modal-description">{project.description}</p>
        <div className="modal-tech">
          <h3>TECH STACK:</h3>
          <div className="tech-list">
            {project.tech.map((tech, idx) => (
              <span key={idx} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
        <div className="modal-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="pixel-button">
              GITHUB
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pixel-button">
              DEMO
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal

