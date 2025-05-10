import React from 'react'
import "../styling/components/signup.scss"

function SignUp({text}) {
  return (
    <div className='signup-container'>
        <form className='signup-inner'>
            <span className='title'>Đăng Ký</span>
            <div className='fields-container'>
                <input type="text" name="fullname" placeholder="Họ và tên" required/>
                <input type="email" name="email" placeholder="Email" required/>
                <input type="password" name="password" placeholder="Mật khẩu" required/>
                <input type="text" name="phone" placeholder="Số điện thoại" required/>
                <input type="text" name="province" placeholder="Tỉnh/Thành phố" required/>
                <input type="text" name="district" placeholder="Quận/Huyện" required/>
                <input type="text" name="ward" placeholder="Phường/Xã" required/>
                <input type="text" name="address" placeholder="Địa chỉ" required/>
            </div>
            <div className='divider'></div>
            <div className='submit-container'>
              {text}
            </div>
        </form>
    </div>
  )
}

export default SignUp