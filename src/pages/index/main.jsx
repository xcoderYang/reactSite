import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from '../../components/login/login.jsx';
import '../global/global.js';
import './main.styl';
import '../global/global.styl'
import { Layout, Input, Select, Button, Row, Col } from 'antd';
const { Content, Footer } = Layout;
const { Option } = Select;

class PostNum extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            numberList: [{
                no: '1',
                animal: 'mouse',
                typeOfAnimal: {
                    name: 'sky'
                },
                
            }],
            input: {
                num: '',
                value: ''
            },
            select: {
                num: '',
                value: ''
            },
            selected: []
        }
    }
    antdSelect(datas, mount){
        if(mount){
            ReactDOM.render(
                <Row>
                    <Select defaultValue={datas[0]}>
                        {datas.map((data)=>{
                            return <Option value={data}>{data}</Option>
                        })}
                    </Select>
                    <Button type="primary">录入</Button>
                </Row>,
                mount
            )
        }else{
            return (
                <Row style={{margin: '30px 0'}}>
                    <Col span={12}>
                        <Select defaultValue={datas[0]} style={{width: '100%'}} >
                            {datas.map((data)=>{
                                return <Option key={data} value={data}>{data}</Option>
                            })}
                        </Select>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <Input placeholder="金额" value="" />
                    </Col>
                    <Col span={2} style={{lineHeight: '32px'}}>元</Col>
                    <Col span={4}>
                        <Button type="primary">录入</Button>
                    </Col>
                </Row>
            )
    
        }
    }
    triggerDataChange(e){
        let name = e.target.name;
        let val = e.target.value;
        if(name){
            let which = name.split('_')[0];
            let type = name.split('_')[1];
            if(which === 'input'){
                if(!/^(\d)*$/.test(val)){
                    return;
                }
            }
            this.setState({
                [which]:Object.assign({}, this.state[which], {
                    [type]: val
                })
            })
        }
    }
    antdInput(placeholder, mount){
        if(mount){
            ReactDOM.render(
                <Row>
                    <Input placeholder = {placeholder} onChange={(e)=>{this.triggerDataChange(e)}} value={this.state.inputValue} />
                    <Button onclick={(e)=>{this.numInput(e)}} type="primary">录入</Button>
                </Row>,
                mount
            )
        }else{
            return (
                <Row>
                    <Col span={8}><Input name="input_num" placeholder = "号码" onChange={(e)=>{this.triggerDataChange(e)}} value={this.state.input.num} allowClear="true" /></Col>
                    <Col span={2}></Col>
                    <Col span={8}><Input name="input_value" placeholder = "金额" onChange={(e)=>{this.triggerDataChange(e)}} value={this.state.input.value} allowClear="true" /></Col>
                    <Col span={2} style={{lineHeight: '32px'}}>元</Col>
                    <Col span={4}><Button type="primary" onClick={(e)=>{this.numInput(e)}}>录入</Button></Col>
                </Row>
            )
    
        }
    }
    numInput(){
        let No = this.state.input.num;
        let val = this.state.input.value;
    }
    dataTran(key, col){
        if(col){
            
        }
    }
    dataOutputPanel(dataOutput){
        let oneDom = dataOutput.map((data)=>{
            return (
                <Row>
                    <Col span={4}>报号:  {data.type}</Col>
                    <Col span={4}>金额:  {data.money}</Col>
                    <Col span={4}><Button type="primary">修改</Button></Col>
                    <Col span={4}><Button type="primary">取消</Button></Col>
                </Row>
            )
        })
        return (
            <div>
                {oneDom}
            </div>
        )
    }
    render(){
        let allNum = [];
        allNum.indexCreate(49, true);
        return (
                <Layout className="box-center">
                    <Content className="data-panel">
                        {/*this.dataOutputPanel()*/}
                    </Content>
                    <Content className="antd-input">
                        {this.antdSelect(allNum)}
                        {this.antdInput()}
                    </Content>
                </Layout>
        )
    }
}

ReactDOM.render(<PostNum />, document.getElementById('root'));