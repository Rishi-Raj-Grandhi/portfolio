import { useState, useEffect } from 'react'
import projectsData from '../data/projects.json'
import ProjectModal from './ProjectModal'

const ProjectGrid = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">PROJECTS</h2>
      <div className="project-grid">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-card-inner">
              <h3>{project.title}</h3>
              <p>{project.description.substring(0, 100)}...</p>
              <div className="project-tech">
                {project.tech.slice(0, 3).map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

export default ProjectGrid

