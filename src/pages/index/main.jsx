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
            input: {
                num: '',
                value: '',
                time: ''
            },
            select: {
                num: '100',
                value: '',
                time: ''
            },
            selected: [],
            index: 0,
            typeMap: {
                100: '1,2,3,4,5,6,7,8,9,10',
                101: '11,12,13,14,15,16,17,18,19,20',
                102: '21,22,23,24,25,26,27,28,29,30',
                103: '31,32,33,34,35,36,37,38,39,40',
                104: '41,42,43,44,45',
                105: '46,47,48,49',
            }
        }
        this.triggerDataChange = this.triggerDataChange.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.dataDelete = this.dataDelete.bind(this);
        this.dataUpdate = this.dataUpdate.bind(this);
        this.compute = this.compute.bind(this);
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
        let keys = Object.keys(datas);
        return (
            <Row style={{margin: '30px auto', width: '60%'}}>
                <Col span={12}>
                    <Select mode="multiple" style={{width: '100%'}} name="select_num" onChange={(e)=>{this.triggerDataChange({target:{name:'select_num', value: e}})}} value={this.state.select.num} ref="selectNum" >
                        {keys.map((key)=>{
                            return <Option key={key} >{key}</Option>
                        })}
                    </Select>
                </Col>
                <Col span={2}></Col>
                <Col span={4}>
                    <Input placeholder="金额" name="select_value" onChange={this.triggerDataChange} value={this.state.select.value} ref="selectInput" />
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
                <Col span={8}><Input name="input_num" placeholder = "号码" onChange={this.triggerDataChange} value={this.state.input.num} allowClear={true} ref="numInput" /></Col>
                <Col span={2}></Col>
                <Col span={8}><Input name="input_value" placeholder = "金额" onChange={this.triggerDataChange} value={this.state.input.value} allowClear={true} ref="moneyInput" /></Col>
                <Col span={2} style={{lineHeight: '32px'}}>元</Col>
                <Col span={4}><Button type="primary" onClick={(e)=>{this.updateInput(e, 'input')}}>录入</Button></Col>
            </Row>
        )
    }
    updateInput(e, type){
        let No = ''+this.state[type].num || '';
        let val = ''+this.state[type].value || '';
        No = No.replace(/,/g, ', ');
        if(!No.trim() || !val.trim()){
            return;
        }
        let now = new Date(),
            hour = now.getHours()>=10?now.getHours():'0'+now.getHours(),
            min = now.getMinutes()>=10?now.getMinutes():'0'+now.getMinutes(),
            sec = now.getSeconds()>=10?now.getSeconds():'0'+now.getSeconds();
        this.setState((state)=>{
            state.selected.push({
                index: this.state.index++,
                key: No,
                money: val,
                time: hour+':'+min+':'+sec
            })
            return state.selected.slice();
        });
        this.setState((state)=>{
            
            state[type].num = type==='select'?[]:'';
            state[type].value = '';
            state[type].time = '';
        })
        let panel = this.refs.dataPanel;
        panel.scrollTop = panel.scrollHeight;
    }
    lightUp(e){
        e.currentTarget.style.border="1px solid black";
    }
    lightDown(e){
        e.currentTarget.style.border="none";
    }
    dataOutputPanel(dataOutput){
        (dataOutput = dataOutput || this.state.selected);
        let oneDom = dataOutput.map((data, index)=>{
            return (
                <Row key={index} className="one_data" onMouseEnter={this.lightUp} onMouseLeave={this.lightDown}>
                    <Col style={{display: 'none'}} span={4}>时间:  {data.time}</Col>
                    <Col span={10}>报号:  {data.key}</Col>
                    <Col span={6}>金额:  {data.money}元</Col>
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
        this.setState((state)=>{
            return state.selected.splice(index, 1).slice();
        })
    }
    dataUpdate(e, index){
    }
    dialog(html){
        return (
            <div className="mBox">
                {html}
            </div>
        )
    }
    dataTran(datas){
        let typeMap = this.state.typeMap;
        let indexMap = [];
        let dataSplit = [];
        datas = datas.map((data)=>{
            let keys = data.key.split(', ');
            keys = keys.map((key)=>{
                return +key>=100?typeMap[key]:key;
            });

            return {
                money: data.money,
                from: data.index,
                keys: keys
            }
        }) 
        datas.forEach((data)=>{
            data.keys.forEach((key)=>{
                let nums = key.split(',');
                nums.forEach((num)=>{
                    dataSplit.push({
                        from: data.from,
                        money: data.money,
                        number: num
                    })  
                })
            })
        })
        dataSplit.forEach((data)=>{
            let index = +data.number;
            indexMap[index] = indexMap[index] || {};
            indexMap[index].money = indexMap[index].money || 0;
            indexMap[index].from = indexMap[index].from || [];
            indexMap[index].money += +data.money;
            indexMap[index].from.push(data.from);
            indexMap[index].index = index;
        })
        return indexMap;
    }
    compute(){
        let datas = this.state.selected.slice();
        let html = <div></div>;
        let innerHTML;
        /**
         * datas 用户所报原始数据                    datas 处理后的数据
         * 
         * index: 索引                              number: 号码，一般是按照从小到大排序
         * key:   用户所申报的种类或者号码            money:  同样号码所报金额
         * money: 所报金额                           from:   当前号码来源（来自用户所报种类或者号码）的索引
         * time:  所报时间
         * 
         * */
        if(datas.length){
            datas = this.dataTran(datas);
        }
        let fill_count = 49 - datas.length;
        let remain_count = 8 - fill_count;
        let originDatas = datas.slice();
        datas.sort((front, behind)=>{return +front.money - +behind.money});
        datas = datas.slice(remain_count>0?remain_count:0);
        datas.sort((front, behind)=>{return front.index - behind.index});
        let sum = datas.reduce((prev, cur)=>{
            return +prev+cur.money;
        }, 0);
        let subSum = originDatas.reduce((prev, cur)=>{
            return +prev+cur.money;
        }, 0);
    }
    render(){
        let allNum = [];
        allNum.indexCreate(49, true);
        return (
                <Layout className="box-center">
                    <Content style={{width: '100%',height: '100%'}}>
                        {this.dataOutputPanel()}
                        {this.antdSelect(this.state.typeMap)}
                        {this.antdInput()}
                        <div style={{marginTop: '20px'}}>
                            <Button style={{width: '200px'}} type="primary" onClick={this.compute}>计算</Button>
                        </div>
                        <div className="mBox"></div>
                    </Content>
                </Layout>
        )
    }
}

ReactDOM.render(<PostNum />, document.getElementById('root'));