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
                value: '',
                time: ''
            },
            select: {
                num: '1',
                value: '',
                time: ''
            },
            selected: [],
            index: 0
        }
        this.triggerDataChange = this.triggerDataChange.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.dataDelete = this.dataDelete.bind(this);
        this.dataUpdate = this.dataUpdate.bind(this)
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
    antdSelect(datas){
        return (
            <Row style={{margin: '30px auto', width: '60%'}}>
                <Col span={12}>
                    <Select defaultValue={datas[0]} style={{width: '100%'}} name="select_num" onChange={(e)=>{this.triggerDataChange({target:{name:'select_num', value: e}})}} value={this.state.select.num} >
                        {datas.map((data)=>{
                            return <Option key={data} value={data}>{data}</Option>
                        })}
                    </Select>
                </Col>
                <Col span={2}></Col>
                <Col span={4}>
                    <Input placeholder="金额" name="select_value" onChange={this.triggerDataChange} value={this.state.select.value} />
                </Col>
                <Col span={2} style={{lineHeight: '32px'}}>元</Col>
                <Col span={4}>
                    <Button type="primary" onClick={(e)=>{this.updateInput(e, 'select')}}>录入</Button>
                </Col>
            </Row>
        )
    }
    antdInput(){
        return (
            <Row style={{width: '60%', margin: 'auto'}}>
                <Col span={8}><Input name="input_num" placeholder = "号码" onChange={this.triggerDataChange} value={this.state.input.num} allowClear={true} /></Col>
                <Col span={2}></Col>
                <Col span={8}><Input name="input_value" placeholder = "金额" onChange={this.triggerDataChange} value={this.state.input.value} allowClear={true} /></Col>
                <Col span={2} style={{lineHeight: '32px'}}>元</Col>
                <Col span={4}><Button type="primary" onClick={(e)=>{this.updateInput(e, 'input')}}>录入</Button></Col>
            </Row>
        )
    }
    updateInput(e, type){
        let No = this.state[type].num;
        let val = this.state[type].value;
        let now = new Date(),
            hour = now.getHours()>10?now.getHours():'0'+now.getHours(),
            min = now.getMinutes()>10?now.getMinutes():'0'+now.getMinutes(),
            sec = now.getSeconds()>10?now.getSeconds():'0'+now.getSeconds();
        this.setState((state)=>{
            state.selected.push({
                index: this.state.index++,
                type: No,
                money: val,
                time: hour+':'+min+':'+sec
            })
            return state.selected.slice();
        });
        let panel = this.refs.dataPanel;
        panel.scrollTop = panel.scrollHeight;
    }
    dataOutputPanel(dataOutput){
        (dataOutput = dataOutput || this.state.selected);
        let oneDom = dataOutput.map((data, index)=>{
            return (
                <Row key={index} className="one_data">
                    <Col span={4}>时间:  {data.time}</Col>
                    <Col span={6}>报号:  {data.type}</Col>
                    <Col span={6}>金额:  {data.money}</Col>
                    <Col span={4}><Button type="primary" onClick={(e)=>{this.dataUpdate(e, index)}}>修改</Button></Col>
                    <Col span={4}><Button type="primary" onClick={(e)=>{this.dataDelete(e, index)}}>取消</Button></Col>
                </Row>
            )
        })
        return (
            <div ref="dataPanel" className="data-panel">
                {oneDom}
            </div>
        )
    }
    dataDelete(e, index){
        console.log(index);
        this.setState((state)=>{
            return state.selected.splice(index, 1).slice();
        })
    }
    dataUpdate(e, index){
        console.log(index);
    }
    render(){
        let allNum = [];
        allNum.indexCreate(49, true);
        return (
                <Layout className="box-center">
                    <Content style={{width: '100%',height: '100%'}}>
                        {this.dataOutputPanel()}
                        {this.antdSelect(allNum)}
                        {this.antdInput()}
                    </Content>
                </Layout>
        )
    }
}

ReactDOM.render(<PostNum />, document.getElementById('root'));