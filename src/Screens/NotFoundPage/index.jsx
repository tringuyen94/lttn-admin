import React from 'react'
import './NotFoundPage.css'


const NotFoundPage = () => {
   return (
      <div className="notfoundpage">
         <div className="notfoundpage__container">
            <p>Oops! Đường dẫn này không tồn tại</p>
            <h1> 404 error</h1>
            <a href="/admin">Quay lại trang chủ</a>
         </div>
      </div>
   )
}


export default NotFoundPage
