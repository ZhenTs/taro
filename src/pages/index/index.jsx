import Taro from "@tarojs/taro";
import { AtTabBar } from "taro-ui";
import { View, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";

import ServiceTab from "../service/components/tab";
import OrderTab from "../order/components/tab";
import MineTab from "../mine/components/tab";

import "./index.scss";
import serviceImg from "../../images/tab/service.png";
import serviceSelectedImg from "../../images/tab/service.selected.png";
import orderImg from "../../images/tab/order.png";
import orderSelectedImg from "../../images/tab/order.selected.png";
import mineImg from "../../images/tab/mine.png";
import mineSelectedImg from "../../images/tab/mine.selected.png";

const customerTabList = [
  {
    title: "服务",
    image: serviceImg,
    selectedImage: serviceSelectedImg
  },
  {
    title: "订单",
    image: orderImg,
    selectedImage: orderSelectedImg
  },
  {
    title: "我的",
    image: mineImg,
    selectedImage: mineSelectedImg
  }
];

const employeeTabList = [
  {
    title: "订单",
    image: orderImg,
    selectedImage: orderSelectedImg
  },
  {
    title: "我的",
    image: mineImg,
    selectedImage: mineSelectedImg
  }
];

@connect(({ common, service, order, mine, loading }) => ({
  common,
  service,
  order,
  mine,
  loading: loading.models
}))
export default class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      loginType: this.props.common.loginType || "customer"
    };
  }

  componentDidMount() {
    this.handleNavigationBarTitle(0);
  }

  handleNavigationBarTitle(value) {
    const { loginType } = this.state;
    if (loginType === "customer") {
      Taro.setNavigationBarTitle({ title: customerTabList[value].title });
    } else {
      Taro.setNavigationBarTitle({ title: employeeTabList[value].title });
    }
  }

  handleClick(value) {
    const { loginType } = this.state;
    if (loginType === "customer") {
      Taro.setNavigationBarTitle({ title: customerTabList[value].title });
    } else {
      Taro.setNavigationBarTitle({ title: employeeTabList[value].title });
    }
    this.setState({
      current: value
    });
  }

  renderCurrent() {
    let currentTab;
    const { current, loginType } = this.state;
    if (loginType === "customer") {
      if (current === 0) {
        currentTab = <ServiceTab />;
      } else if (current === 1) {
        currentTab = <OrderTab />;
      } else {
        currentTab = <MineTab />;
      }
    } else {
      if (current === 0) {
        currentTab = <OrderTab />;
      } else {
        currentTab = <MineTab />;
      }
    }
    return currentTab;
  }

  render() {
    return (
      <View className="index-page">
        <ScrollView className='container'>{this.renderCurrent()}</ScrollView>
        <AtTabBar
          fixed
          iconSize={24}
          selectedColor='#CF0000'
          tabList={
            this.state.loginType === "customer"
              ? customerTabList
              : employeeTabList
          }
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    );
  }
}
