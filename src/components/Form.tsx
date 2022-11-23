import React, { useState } from 'react'

const UserNameForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <div>
      <div>
        <label htmlFor="firstname">FirstName</label>
        <input
          type="text"
          id="firstname"
          value={firstName}
          onChange={e => setFirstName(e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="lastname">LastName</label>
        <input
          type="text"
          id="lastname"
          value={lastName}
          onChange={e => setLastName(e.currentTarget.value)}
        />
      </div>
      <button>次の画面へ</button>
    </div>
  )
}

export default UserNameForm
