import React, { Component } from 'react'

//Pages
import ChangeServ from './ChangeServ'

//Dx
import {
    List,
    Button,
    SelectBox,
} from 'devextreme-react'
import { Popup } from 'devextreme-react/popup';
import { 
    BarGauge, 
    Label, 
    Size
} from 'devextreme-react/bar-gauge';

//import '.../css/Home.scss'

class Home extends Component{
    constructor(props) {
        super(props);

        //sample data
        this.state = {
            ServInfo: [{
                key: 'Serv 1',
                items: [{SiteName: 'Qwe', ServName: 'Serv 1'}, {SiteName: 'Asd', ServName: 'Serv 1'}]
            }, {
                key: 'Serv 2',
                items: [{SiteName: 'Qwer', ServName: 'Serv 2'}, {SiteName: 'Asdf', ServName: 'Serv 2'}]
            }, {
                key: 'Serv 3',
                items: [{SiteName: 'Qwert', ServName: 'Serv 3'}, {SiteName: 'Asdfg', ServName: 'Serv 3'}]
            }],
            popupVisible: false,
            popupInfo: {},
            tmp: {},
            values: [50],
        }

        this.refs = null

        this.setListRef = element => {
            this.refs = element
        }

        this.onChangeServClick = this.onChangeServClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.tmpValue = this.tmpValue.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        //Api calls here
    }

    onChangeServClick(args) {
        //server change handle
        this.setState(() => {
            return {
                popupVisible: true,
                popupInfo: args.itemData,
            }
        })
    }

    hidePopup() {
        this.setState(() => {
            this.refs.instance.reload()
            return {popupVisible: false}
        })
    }

    handleChange() {
        this.setState((state) => {
            var res = state.ServInfo;
            var reord1 = {}
            var reord2 = {}
            for (var i in res) {
                if (res[i].key == state.popupInfo.ServName) {
                    res[i].items.splice(res[i].items.indexOf(state.popupInfo), 1)
                    reord1.group = i;
                    reord1.index = res[i].items.indexOf(state.popupInfo);
                }
            }
            for (var i in res) {
                if (res[i].key == state.tmp) {
                    var t = state.popupInfo;
                    t.ServName = state.tmp;
                    t.key = state.tmp;
                    reord2 = i;
                    reord2 = res[i].items.length
                    res[i].items.push(t);
                }
            }
            // console.log(res)
            //this.refs.reorderItem(reord1,reord2);
            return {ServInfo: res}
        })
    }

    getServerList(data) {
        var res = [];
        for (var i in data) {
            res.push(data[i].key)
        }
        return res;
    }

    tmpValue(args) {
        this.setState({tmp: args.value})
    }

    render() {
        const {
            ServInfo,
            popupVisible,
            popupInfo,
            values
        } = this.state

        const format = {
            type: 'fixedPoint',
            precision: 1
        };

        const Servers = this.getServerList(ServInfo)

        return (
            <>
                <div style= {{textAlign: 'center'}}>Нажмите на сайт для подробной информации</div>
                <List
                    ref={this.setListRef}
                    dataSource={ServInfo}
                    grouped={true}
                    collapsibleGroups={true}
                    hoverStateEnabled={false}
                    activeStateEnabled={false}
                    focusStateEnabled={false}
                    onGroupRendered={(e) => {
                        console.log(e.groupData)
                        e.component.collapseGroup(e.groupIndex)}}
                    onItemClick={this.onChangeServClick}
                    itemRender={(e) => {
                        return (
                            <>
                                <p>{e.SiteName}</p>

                                {/* <Button
                                    onClick={this.onChangeServClick}
                                    text={'Переместить сервер'}
                                /> */}
                            </>
                        )
                    }}
                />
                <Popup
                    height= '100%'
                    visible={popupVisible}
                    onHiding={this.hidePopup}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title={'Информация по ' + popupInfo.SiteName}
                    fullScreen={true}
                >
                    <div>Текущий сервер: {popupInfo.ServName}</div>
                    <SelectBox
                        dataSource= {Servers}
                        onValueChanged={this.tmpValue}
                    />
                    <Button
                        text={'Поменять сервер'}
                        onClick={this.handleChange}
                    />
                    <div style={{alignItems: 'center'}}>
                        <BarGauge
                            id="barGauge"
                            startValue={0}
                            endValue={100}
                            defaultValues={values}
                        >
                            <Size
                                height={300}
                                width={300}
                            />
                            <Label  indent={30} format={format} customizeText={this.customizeText} />
                        </BarGauge>
                    </div>
                </Popup>
            </>
        )
    }

    customizeText({ valueText }) {
        return `${valueText} %`;
    }
}

export default Home;