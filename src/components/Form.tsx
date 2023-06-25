import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const UserNameForm = () => {
  const {
    register,
    trigger,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    mode: 'all',
  })

  return (
    <main>
      <section>
        <form
          onSubmit={handleSubmit(() => {
            console.log('submit')
          })}
        >
          <h1>フォーム入力</h1>
          <div>
            <label htmlFor="firstname">FirstName</label>
            <input
              type="text"
              id="firstname"
              aria-required
              {...register('firstName', { required: true, maxLength: 5 })}
            />
            {errors.firstName?.type === 'required' && (
              <p role="alert">firstNameは必須入力です。</p>
            )}
            {errors.firstName?.type === 'maxLength' && (
              <p role="alert">firstNameは5文字以下で入力してください。</p>
            )}
          </div>
          <div>
            <label htmlFor="lastname">LastName</label>
            <input
              type="text"
              id="lastname"
              aria-required
              {...register('lastName', { required: true, maxLength: 7 })}
            />
            {errors.lastName?.type === 'required' && (
              <p role="alert">lastNameは必須入力です。</p>
            )}
            {errors.lastName?.type === 'maxLength' && (
              <p role="alert">lastNameは7文字以下で入力してください。</p>
            )}
          </div>
          <button
            onClick={() => {
              // triggerでもフォームエラー要素にフォーカス当たる？？ -> 当たる
              trigger('firstName')
              trigger('lastName')
            }}
          >
            バリデーショントリガー
          </button>
          <input type="submit" value="確定する" />
        </form>
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
