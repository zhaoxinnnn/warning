import React, {Component} from 'react';  
import { Menu, Icon } from 'antd';
import axios from 'axios';

const SubMenu = Menu.SubMenu;

export default class Tab extends Component {
 // submenu keys of first level
  rootSubmenuKeys = ['time1', 'sub2', 'sub4'];
  state = {
    openKeys: ['time1'],
    defaultSelectedKeys: ['today']
  };
  handleClick = (e) => {
    axios.get(`/getDatas/${e.key}`)
    .then(response=>{
      console.log(response.data);
        this.setState({
            responeDatas: response.data
        });
    }).catch(function(error){
        this.setState({
            responeDatas: []
        });
    });
  }
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        defaultSelectedKeys = {this.state.defaultSelectedKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 240 }}
        onClick={this.handleClick}
      >
        <SubMenu key="time1" title={<span><Icon type="mail" /><span>按日期查询</span></span>}>
          <Menu.Item key="today">当天</Menu.Item>
          <Menu.Item key="week">本周</Menu.Item>
          <Menu.Item key="month">本月</Menu.Item>
          <Menu.Item key="all">所有</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}