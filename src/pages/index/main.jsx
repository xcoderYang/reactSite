import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from '../../components/login/login.jsx';
import '../global/global.js';
import './main.styl';
import '../global/global.styl'
import { Input, Button, Row, Col } from 'antd';

function antdSelect(optionVal, mount){
    const option = optionVal.map((val)=>{
        return <Option key={val}>{val}</Option>
    });
    if(mount){
        ReactDOM.render(
            <div>
                <Select>
                    {option}
                </Select>
            </div>, 
            mount
        )
    }else{
        return <Select defaultValue={optionVal[0]}>
                {option}
            </Select>
        
    }
}
function antdInput(placeholder, mount){
    if(mount){
        ReactDOM.render(
            <Row>
                <Input placeholder = {placeholder} />
                <Button type="primary">录入</Button>
            </Row>,
            mount
        )
    }else{
        return (
            <Row>
                <Col span={8}><Input placeholder = {placeholder} /></Col>
                <Col span={2}></Col>
                <Col span={8}><Input placeholder = {placeholder} /></Col>
                <Col span={2}></Col>
                <Col span={4}><Button type="primary">录入</Button></Col>
            </Row>
        )

    }
}


class PostNum extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            numberList: [{
                no: '1',
                animal: 'mouse',
                typeOfAnimal: {
                    name: 'sky'
                }
            }]
        }
    }
    render(){
        let allNum = [];
        allNum.indexCreate(49, true);
        console.log(allNum);
        return (
            <div className="box-center">
                <div className="antd-input">
                    {antdInput()}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<PostNum />, document.getElementById('root'));