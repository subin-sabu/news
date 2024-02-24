import React from 'react'

function Anchor() {
  return (
    <div>
      <a href='https://www.google.com' style={{ margin: '1rem' }}>Visit Now</a>
      <a href="https://mail.google.com" target='_blank' rel="noreferrer" >Open in New Tab</a>

      {/* ordered list  */}
      <ol>
        <li>Aadhar</li>
        <li>PAN</li>
        <li>Driving Licence</li>
        <li>Voter's ID</li>
      </ol>
      <ul>
        <li>Aadhar</li>
        <li>PAN</li>
        <li>Driving Licence</li>
        <li>Voter's ID</li>
      </ul>

    </div>
  )
}

export default Anchor