import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer '>
      <div className="footer-section">
          <p className="title">FoodiesHub.com</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ullam qui accusantium tempora ducimus inventore consectetur nostrum ab, molestiae fugiat id ipsa? Ut, repellendus minima nostrum deserunt nobis voluptatibus expedita?</p>
          <p>&copy; 2022 | All Rights Reserved</p>
      </div>
      <div className="footer-section">
          <p className="title">Contact Us</p>
          <p>foodieshub@gmail.com</p>
      </div>
      <div className="footer-section">
          <p className="title">Socials</p>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
      </div>
    </div>
  )
}

export default Footer
