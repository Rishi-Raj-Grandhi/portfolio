import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    emailjs.init('YzMTvrjVm2bIKU9gh') // Replace with your EmailJS public key
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        'service_8lv4irw', // Replace with your service ID
        'template_9xc57nf', // Replace with your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      )
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 3000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus(null), 3000)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">CONTACT</h2>
      <form onSubmit={handleSubmit} className="contact-form pixel-panel">
        <div className="form-group">
          <label>NAME:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="pixel-input"
          />
        </div>
        <div className="form-group">
          <label>EMAIL:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="pixel-input"
          />
        </div>
        <div className="form-group">
          <label>MESSAGE:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="pixel-input"
          />
        </div>
        <button type="submit" className="pixel-button" disabled={status === 'sending'}>
          {status === 'sending' ? 'SENDING...' : 'SEND'}
        </button>
        {status === 'success' && (
          <div className="status-message success">MESSAGE SENT!</div>
        )}
        {status === 'error' && (
          <div className="status-message error">ERROR. TRY AGAIN.</div>
        )}
      </form>
    </section>
  )
}

export default ContactForm

