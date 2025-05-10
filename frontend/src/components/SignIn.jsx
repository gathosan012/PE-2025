import React from 'react'
import "../styling/components/signin.scss"
import { useEffect, useState, useRef } from 'react'

function SignIn({text}) {
  const [isEmailClicked, setIsEmailClicked] = useState(false)
  const emailRef = useRef(null)

  const [isPasswordClicked, setIsPasswordClicked] = useState(false)
  const passwordRef = useRef(null)

  const [emailError, setEmailError] = useState("")
  const [passError, setPassError] = useState("")
  const [formError, setFormError] = useState("")

  const [account , setAccount] = useState({
      email: "",
      password: ""
  })

  return (
    <div className='signin-container'>
        <form className='signin-inner'>
            <span className='title'>Đăng Nhập</span>
            <div className='fields-container'>
                <input type='email' required placeholder='Email address*'></input>
                <input type='Password' required placeholder='Password*'></input>
                <div className='remember-container'>
                    <input type="checkbox" id="remember" name="remember" value="remember"></input>
                    <label for="remember">Nhớ mật khẩu</label>
                </div>
            </div>
            <div className='divider'></div>
            <div className='submit-container'>
              {text}
            </div>
        </form>
    </div>
  )
}

export default SignIn