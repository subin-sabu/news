import React from 'react'

function SignUp() {
  return (
    <div>
      <form action="https://www.manoramanews.com/">
        <h3>Sign Up</h3>
        <label htmlFor="#">Full Name</label>
        <input type="text" />
        <br />
        <label htmlFor="#">Email</label>
        <input type="email" />
        <br />
        <label htmlFor="#">Password</label>
        <input type="password" />
        <br />
        <label htmlFor="#">Phone Number</label>
        <input type="number" />
        <br />
        <select name="" id="">
          <option value="default">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default SignUp