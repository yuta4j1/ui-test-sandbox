import React, { useState } from 'react'

const UserNameForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <main>
      <section>
        <h1>フォーム入力</h1>
        <div>
          <label htmlFor="firstname">FirstName</label>
          <input
            type="text"
            id="firstname"
            value={firstName}
            onChange={e => setFirstName(e.currentTarget.value)}
            aria-required
          />
        </div>
        <div>
          <label htmlFor="lastname">LastName</label>
          <input
            type="text"
            id="lastname"
            value={lastName}
            onChange={e => setLastName(e.currentTarget.value)}
            aria-required
          />
        </div>
        <button>次の画面へ</button>
      </section>
      <section>
        <h1>新たなセクション</h1>
        <p>
          何は事実やはりこの注意院というののためが叱らですん。どうしても十月を講演性もけっしてその攻撃でしょなくなりで分りてみるうをは学習立ち行かだっですば、あまりには忘れですますたでしょ。
          胸を聞いた事もいやしくも十月についにでだます。
        </p>
      </section>
    </main>
  )
}

export default UserNameForm
