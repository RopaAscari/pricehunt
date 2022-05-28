import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated} from 'react-native';

type Props = {
  reset: boolean;
  stop: boolean;
  active: boolean;
  storyAmount: number;
  closeStory(): void;
  nextStory(): void;
};

type State = {};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    progressStatus: 0,
  };
  anim = new Animated.Value(0);
  componentDidMount() {
    if (this.props.active) {
      this.onAnimate();
    }
  }

  onAnimate = () => {
    this.anim.addListener(({value}) => {
      this.setState({progressStatus: parseInt(value.toString(), 10)});
    });
    Animated.timing(this.anim, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  render() {
   // console.log(this.props.active);
    if (this.state.progressStatus === 100) {
      //  console.log('Next Story')
      //  this.props.nextStory()
    }
    return (
      <View style={styles(this.props).container}>
        <Animated.View
          style={[
            styles(this.props).inner,
            {width: this.state.progressStatus + '%'},
          ]}
        />
      </View>
    );
  }
}
const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      width: (100 / props.storyAmount).toString() + '%',
      height: 6,
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 30,
      justifyContent: 'center',
    },
    inner: {
      width: (100 / props.storyAmount).toString() + '%',
      height: 6,
      borderRadius: 10,
      backgroundColor: 'black',
    },
    label: {
      fontSize: 23,
      color: 'black',
      position: 'absolute',
      zIndex: 1,
      alignSelf: 'center',
    },
  });
