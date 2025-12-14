const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">ABOUT</h2>
      
      <div className="about-content">
        {/* Education */}
        <div className="about-card">
          <h3 className="about-card-title">EDUCATION</h3>
          <div className="about-item">
            <h4>Vellore Institute of Technology</h4>
            <p className="about-meta">B.Tech in Computer Science and Engineering</p>
            <p className="about-meta">CGPA: 8.50</p>
            <p className="about-date">Sept 2022 – May 2026</p>
          </div>
        </div>

        {/* Experience */}
        <div className="about-card">
          <h3 className="about-card-title">EXPERIENCE</h3>
          
          <div className="about-item">
            <h4>Software Developer Intern</h4>
            <p className="about-company">XIUS SOARG TECHNOLOGIES, Hyderabad</p>
            <p className="about-date">May 2025 – Jun 2025</p>
            <ul className="about-list">
              <li>Secured 20+ REST APIs with JWT-based authentication in Spring Boot, reducing unauthorized access attempts</li>
              <li>Developed 5+ API adapters for legacy SOAP services, enabling integration with React frontends</li>
              <li>Built a real-time session management module in React + Redux, improving session tracking accuracy</li>
            </ul>
          </div>

          <div className="about-item">
            <h4>Software Developer Intern</h4>
            <p className="about-company">APXOR TECHNOLOGY SOLUTIONS, Hyderabad</p>
            <p className="about-date">May 2024 – July 2024</p>
            <ul className="about-list">
              <li>Built and tested 5+ REST APIs in Express.js with JWT; created 20+ Postman test cases to support QA</li>
              <li>Contributed to Kafka pipelines and WebSocket integrations, improving internal data flow in test environments</li>
              <li>Assisted in profiling/debugging backend services, leading to faster API responses during team testing</li>
            </ul>
          </div>

          <div className="about-item">
            <h4>Web Developer Intern</h4>
            <p className="about-company">OROM CORP., Vellore</p>
            <p className="about-date">Feb 2023 – Apr 2023</p>
            <ul className="about-list">
              <li>Developed 3 full-stack modules using React.js, JavaScript, and PHP; accelerated web page load speed by 35% through optimized component design</li>
              <li>Engineered database-driven backend systems in PHP and MySQL, supporting CRUD operations for 1K+ dynamic content entries</li>
            </ul>
          </div>
        </div>

        {/* Skills */}
        <div className="about-card">
          <h3 className="about-card-title">TECHNICAL SKILLS</h3>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Programming Languages</h4>
              <p>Java, JavaScript, Python, C/C++</p>
            </div>
            <div className="skill-category">
              <h4>Web Technologies</h4>
              <p>React.js, Node.js, Express.js, HTML5, CSS3, RESTful APIs, Spring Boot, JWT Authentication</p>
            </div>
            <div className="skill-category">
              <h4>Databases & Tools</h4>
              <p>MySQL, PostgreSQL, MongoDB, Firebase, Redis, Apache Kafka, Docker, Git, VS Code, n8n</p>
            </div>
            <div className="skill-category">
              <h4>Data Science & ML</h4>
              <p>Scikit-learn, Pandas, NumPy, Matplotlib, NLTK, Machine Learning Algorithms, Data Analysis</p>
            </div>
            <div className="skill-category">
              <h4>Cloud & Certifications</h4>
              <p>AWS Certified Solutions Architect – Associate (SAA-CO3)</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="about-card">
          <h3 className="about-card-title">ACHIEVEMENTS</h3>
          <ul className="about-list">
            <li>Secured 2nd place at TechBids Hackathon among 50+ teams (Feb 2025)</li>
            <li>Published research paper in IEEE 2024</li>
            <li>Core member of CSED R&D Team, contributing to research-driven projects</li>
            <li>Worked as Production Manager & Writer for student short films</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About

