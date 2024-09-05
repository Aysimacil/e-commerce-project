import { useRef } from 'react';
import Card from '../../components/card/Card';
import './Contact.css';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    alert(form);
  };

  return (
    <section>
      <div className='container contact'>
        <h2>Contact Us</h2>
        <div className='section'>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass='card'>
              <label>Name</label>
              <input type='text' name='user_name' placeholder='Full Name' required />
              <label>Email</label>
              <input type='email' name='user_email' placeholder='Your active email' required />
              <label>Subject</label>
              <input type='text' name='subject' placeholder='Subject' required />
              <label>Message</label>
              <textarea name='message' cols='30' rows='10'></textarea>
              <button className='--btn --btn-primary'>Send Message</button>
            </Card>
          </form>

          <div className='details'>
            <Card cardClass='card2'>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className='icons'>
                <span>
                  <FaPhoneAlt className='icon' />
                  <p>+123 456 789</p>
                </span>
                <span>
                  <FaEnvelope className='icon' />
                  <p>Support@eprice.com</p>
                </span>
                <span>
                  <GoLocation className='icon' />
                  <p>Netherlands</p>
                </span>
                <span>
                  <FaXTwitter className='icon' />
                  <p>@aysimacill</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
