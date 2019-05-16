import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from '../../components/login/login.jsx';
import './main.styl';
import '../global/global.styl'

class mainPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
}
let datas = {
    isLogin: true
}

if(!datas.isLogin){
    ReactDOM.render(<Login />, document.getElementById('root'));
}