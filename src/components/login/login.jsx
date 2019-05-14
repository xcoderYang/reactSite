import React, { Component } from 'react';
import './login.styl'
class shadePanel extends Component{
    constructor(props){
        super(props);
        this.isLogin = false;
        document.documentElement.style.overflow = "hidden";
    }
    render(){
      return(
        <div className="shade_panel">
          <div className="login-box">
            <header className="txt-center">请输入您的账号和密码</header>
            <main>
              <div className="txt-center input-box">
                <label><input name="account" type="text" placeholder="account" /></label>
              </div>
              <div className="txt-center input-box">
                <label><input name="password" type="password" /></label>
              </div>
            </main>
            <footer><a>忘记密码?</a></footer>
          </div>
        </div>
      )
    }
}

export default shadePanel
