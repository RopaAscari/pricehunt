/* eslint-disable */
import dayjs from 'dayjs';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class UserView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.formatStoryDate()
  }

  formatStoryDate = () => {
    if(this.props.time === undefined) {
      return 'Invalid Time'
    }
    const currentTime = new Date().getTime()
    const timeElapsed = Math.abs(this.props.time - currentTime) / 1000;

   // console.log(Math.abs(this.props.time - currentTime) / 3600000)

    if(timeElapsed/60 <  1){
      const timeInSeconds = Math.round(timeElapsed)
      return `Posted ${timeInSeconds}s ago`
    } else if(timeElapsed/60 >  1 && timeElapsed / 3600 < 1) {
      const timeInMinutes = Math.round(timeElapsed/60)
      return `Posted ${timeInMinutes}m ago`
    } else{
      const timeInHours = Math.round(timeElapsed/3600)
      return `Posted ${timeInHours}h ago`
    } 
  }

  render() {
    const {
      props,
    } = this;

    console.log(props)
    const timePosted = this.formatStoryDate()

    return (
      <View style={styles.userView}>
        <Image
          source={{ uri: props.profile }}
          style={styles.image}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{props.viewer === 'merchant'? 'You':props.name}</Text>
          
         { props.id === 'pricehunt'? null :
         <Text style={styles.time}>{timePosted}</Text>
         }

        </View>
        <TouchableOpacity onPress={props.onClosePress}>
          <Icon
            name="close"
            color="white"
            size={25}
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 55,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
});

export default UserView;
