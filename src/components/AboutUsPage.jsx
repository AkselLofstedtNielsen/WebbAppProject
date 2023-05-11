import React from 'react';
import '../AboutUsPage.css'

function AboutUsPage() {
  const contacts = [
    {
      name: 'Big Buster Renthouse',
      email: 'bb-renthouse@gmail.com',
      phone: '555-578-55325',
      Location: 'Kolarängsvägen 67 / 17843 Stockholm'
    }
  ];

  return (
    <div>
      <h1>Contact Information</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.email}>
            <h2>{contact.name}</h2>
            <p className="contact-info">Email: {contact.email}</p>
            <p className="contact-info">Phone: {contact.phone}</p>
            <p className="contact-info">Location: {contact.Location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AboutUsPage;