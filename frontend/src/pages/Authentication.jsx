import React from 'react'
import "../styling/auth.scss"
import { useState } from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

function Authentication() {
    const [status, setStatus] = useState("signin")

    function Text({status}){

      if(status == "signin"){
          return(
              <>
                <span className='redirect-link' onClick={() => setStatus("signup")}>Đăng kí tài khoản mới</span>
                <button className='submit'>Đăng Nhập</button>
              </>
          )
      }
      else if(status == "signup"){
          return(
            <>
              <span className='redirect-link' onClick={() => setStatus("signin")}>Đã có tài khoản</span>
              <button className='submit'>Đăng Ký</button>
            </>
          )
      }
  }


  return (
    <div className='auth-container'>
        <div className='background-container'></div>
        {
            status === "signin" ? <SignIn text={<Text status="signin"></Text>}></SignIn> : <SignUp text={<Text status="signup"></Text>}></SignUp>
        }
    </div>
  )
}

export default Authentication