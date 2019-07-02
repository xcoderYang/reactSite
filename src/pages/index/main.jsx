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
                num: '全数',
                value: '',
                time: ''
            },
            selected: [],
            index: 0,
            typeMap: {
                '全数': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49',
                '双数': '2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48',
                '绿色': '16,28,27,39,38,49,11,12,21,33,32,44,43,6,25,17',
                '红色': '12,24,23,35,34,36,35,8,7,19,18,30,29,40,2,1,13',
                '兰色': '4,3,15,14,26,25,37,36,48,47,10,9,20,31,42,41',
                '大数': '25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49',
                '小数': '|nor(大数)',
                '单数': '|nor(双数)',
                '绿双': '|inter(双数,绿色)',
                '绿单': '|inter(单数,绿色)',
                '兰双': '|inter(双数,兰色)',
                '兰单': '|inter(单数,兰色)',
                '红双': '|inter(双数,红色)',
                '红单': '|inter(单数,红色)',
                '兰大': '|inter(大数,兰色)',
                '兰小': '|inter(小数,兰色)',
                '绿大': '|inter(大数,绿色)',
                '绿小': '|inter(小数,绿色)',
                '红大': '|inter(大数,红色)',
                '红小': '|inter(小数,红色)',
                '绿大单': '|inter(绿单,大数)',
                '绿小单': '|inter(绿单,小数)',
                '兰小单': '|inter(兰单,小数)',
                '兰大单': '|inter(兰单,大数)',
                '红大单': '|inter(红单,大数)',
                '红小单': '|inter(红单,小数)',
                '绿大双': '|inter(绿双,大数)',
                '绿小双': '|inter(绿双,小数)',
                '兰大双': '|inter(兰双,大数)',
                '兰小双': '|inter(兰双,小数)',
                '红大双': '|inter(红双,大数)',
                '红小双': '|inter(红双,小数)'
            },
            aniSimpleMap: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
            mouseMap: ['12', '24', '36', '48'],
            aniAllMap: {
                
            }
            
        }
        this.triggerDataChange = this.triggerDataChange.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.dataDelete = this.dataDelete.bind(this);
        this.dataUpdate = this.dataUpdate.bind(this);
        this.compute = this.compute.bind(this);
        // typeMap预处理
        this.dataInitial();
    }
    dataInitial(){
        let map = this.state.typeMap;
        let all = map['全数'].split(',');
        let aniAllMap = this.state.aniAllMap;
        let aniSimpleMap = this.state.aniSimpleMap;

        for(let key in map){
            let val = map[key];
            if(val.startsWith('|')){
                map[key] = travel(val.slice(1));   
            }
        }
        
        aniAllMap[aniSimpleMap[0]] = this.state.mouseMap.join(',');
        aniSimpleMap.shift();
        aniSimpleMap.forEach((animal)=>{
            
        })
        function travel(datas){
            let method = datas.slice(0, datas.indexOf('('))
            let options = datas.slice(datas.indexOf('(')+1, datas.lastIndexOf(')')).split(',');
            let val = '';
            switch(method){
                case 'nor': val = nor(options);break;
                case 'inter': val = inter(options);break;
                case 'union': val = union(options);break;
                default :throw('error');
            }
            return val.join(',');
            
            function nor(options){
                let num = all.filter((one)=>{
                    return map[options].split(',').indexOf(one)===-1;
                })
                return num;
            }
            function inter(options){
                let first;
                try{
                    first = map[options[0]].split(',');
                }catch(err){
                    debugger;
                    console.log(options);
                }
                //let first = map[options[0]].split(',');
                options.shift();
                let num = first.filter((one)=>{
                    let lag = true;
                    options.forEach((op)=>{
                        if(map[op].split(',').indexOf(one)===-1){
                            lag = false;
                        }else{
                        }
                    })
                    return lag;
                })
                return num;
            }
            function union(options){
                return [];
            }
        }
        for(let key in this.state.typeMap){
            console.log(key, this.state.typeMap[key]);
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
        console.log(datas);
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
        console.log(dataSplit);
        dataSplit.forEach((data)=>{
            let index = data.number;
            indexMap[index] = indexMap[index] || {};
            indexMap[index].money = indexMap[index].money || 0;
            indexMap[index].from = indexMap[index].from || [];
            indexMap[index].money += +data.money;
            indexMap[index].from.push(data.from);
            indexMap[index].index = index;
        })
        console.log(JSON.parse(JSON.stringify(indexMap)));
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
        console.log(JSON.parse(JSON.stringify(datas)));
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

        console.log(originDatas, sum);
        console.log(datas, subSum);
    }
    render(){
        let allNum = [];
        allNum.indexCreate(49, true);
        return (
                <Layout className="box-center">
                    <Content style={{width: '100%',height: '100%', overflow: 'scroll'}}>
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