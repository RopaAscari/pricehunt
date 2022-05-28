import React, { Component } from "react";
import { Animated, Dimensions, TouchableWithoutFeedback, View } from "react-native";

const ELEMENT_HEIGHT = 200;
export default class ExpandedCard extends Component {
  state = { animatedValue: new Animated.Value(0) };
  render() {
    const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
    const topTranslate = this.getTranslate([this.props.yOffset, 0]);
    const leftTranslate = this.getTranslate([this.props.xOffset, 0]);
    const rightTranslate = this.getTranslate([this.props.xOffset, 0]);
    const bottomTranslate = this.getTranslate([
      windowHeight - this.props.yOffset - ELEMENT_HEIGHT,
      0
    ]);
    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            top: topTranslate,
            left: leftTranslate,
            right: rightTranslate,
            bottom: bottomTranslate,
            backgroundColor: "#5cdb95"
          }
        ]}
      >
        <TouchableWithoutFeedback onPress={this.unselectCard}>
          <Animated.Text
            style={{
              color: 'white',
              position: "absolute",
              top: 100,
              right: 20,
              zIndex: 200,
              opacity: this.getTranslate([0, 1])
            }}>X</Animated.Text>
        </TouchableWithoutFeedback>

      </Animated.View>
    );
  }
  componentDidMount() {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver:false
    }).start();
  }
  unselectCard = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver:false,
    }).start(() => this.props.unselectCard());
  };
  getTranslate = outputRange => {
    return this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange
    });
  };
}
