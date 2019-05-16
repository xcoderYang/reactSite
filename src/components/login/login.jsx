import React, { Component } from 'react';
import axios from 'axios'
import './login.styl'
import Mock from 'mockjs'
Mock.mock('./mock', function(e){
  return {
    access: true
  }
});

class shadePanel extends Component{
    constructor(props){
        super(props);
        this.state = {
          account: '',
          pswd: '',
          errorTips: ''
        }
        document.documentElement.style.overflow = "hidden";
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event, type='account'){
      let val = event.target.value;
      this.setState({
        [type]: val
      });
    }
    submitForm(){
      let that = this;
      axios.get('./mock', {
        account: this.state.account,
        pswd: this.state.pswd
      })
      .then(function(e){
        let data = e.data;
        if(data.access){
          window.location.href = window.location.href;
        }else{
          that.setState({errorTips: 'ERROR'});
        }
      })
      .catch(function(err){
        console.log(err);
      })
    }
    render(){
      let errorTips = this.state.errorTips;
      return(
        <div className="shade_panel">
          <div className="login-box">
            <header className="txt-center">请输入您的账号和密码</header>
            <main>
              <div className="txt-center input-box">
                <label><span className="label-head">账号:&nbsp;&nbsp;</span><input name="account" type="text" placeholder="请输入您的账号" autoComplete="new-password" onChange={(e)=>this.handleChange(e, 'account')} /></label>
              </div>
              <div className="txt-center input-box">
                <label><span className="label-head">密码:&nbsp;&nbsp;</span><input name="password" type="password" placeholder="请输入您的密码" autoComplete="new-password" onChange={(e)=>this.handleChange(e, 'pswd')} /></label>
              </div>
            </main>
            <div className="txt-center txt-danger errorTips">{errorTips}</div>
            <footer>
              <div className="txt-center btn-box">
                <button className="btn btn-normal btn-primary" onClick={this.submitForm}>登录</button>
              </div>
            </footer>
          </div>
        </div>
      )
    }
}

export default shadePanel
