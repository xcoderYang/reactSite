import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from '../../components/login/login.jsx';
import '../global/global.js';
import './main.styl';
import '../global/global.styl'

class MainPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            oneOfAnimal: '',
            allAnimal: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
            typeOfAnimal:{
                skyOfAnimal: {
                    name: '天肖',
                    value: []
                }
            }
        }
        console.log(window);
    }
    trRender(index){
        let tdMax = 12;
        let tdItems = [];
        tdItems.indexCreate(tdMax);
        return (
            <tr key={index}>
                {tdItems.map((i)=>
                    this.tdRender(i)
                )}
            </tr>
        )
    }
    tdRender(index){
        return (
            <td key={index}>{index+1}号</td>
        )
    }
    render(){
        let trMax = 5;
        let tdMax = 12;
        let trItems = [];
        let tdItems = [];
        trItems.indexCreate(trMax);
        tdItems.indexCreate(tdMax);
        return (
            <table>
                <tbody>
                    {trItems.map((index)=>
                        this.trRender(index)
                    )}
                </tbody>
            </table>
        )
    }
}
let datas = {
    isLogin: true
}

if(!datas.isLogin){
    ReactDOM.render(<Login />, document.getElementById('root'));
}
ReactDOM.render(<MainPanel />, document.getElementById('root'));