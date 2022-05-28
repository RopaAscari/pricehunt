import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {RootState} from '@reducers/combined-reducers';
import {SetNotificationsAction} from '@actions/set-notification-action';
import { SetNotificationActionType } from '@constants/notification-types';
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

type Props = {
  notifications: Array<any>;
  notificationData: string;
  closeNotifications: () => void;
  reduxSetNotifcationsAction: (notifications: Array<any>) => void;
};

function Notifications(props: Props) {

  const hunterVector = '../../assets/images/hunter.jpg';
  const viewsVector = '../../assets/images/views.jpg';
  useEffect(() => {
    //manageNotifications()
  });

  const manageNotifications = () => {

  }
 
  const formatStoryDate = (index: number) => {
    const currentTime = new Date().getTime();
    const timeElapsed = Math.abs(props.notifications[index].date - currentTime) / 1000;

    //return 'now';
    if(timeElapsed/60 <  1){
      const timeInSeconds = Math.round(timeElapsed)
      return ` ${timeInSeconds}s ago`
    } else if(timeElapsed/60 >  1 && timeElapsed / 3600 < 1) {
      const timeInMinutes = Math.round(timeElapsed/60)
      return ` ${timeInMinutes}m ago`
    } else{
      const timeInHours = Math.round(timeElapsed/3600)
      return ` ${timeInHours}h ago`
    } 
  };

  const renderNotifications = () => {
    if (props.notifications.length > 0) {
      return props.notifications.reverse().map((data, index) => {
        return (
          <React.Fragment key={index}>
          <View style={{flexDirection: 'row'}}>
           { data.type === 'subscribe'?
           <Image
              source={require(hunterVector)}
              style={{
                height: 70,
                width: 70,
                borderRadius: 200,
                resizeMode: 'contain',
                marginTop: '7%',
              }}
            />: 
            <Image
              source={require(viewsVector)}
              style={{
                height: 70,
                width: 70,
                borderRadius: 200,
                resizeMode: 'contain',
                marginTop: '7%',
              }}
            />
            }
            <View
              style={{
                marginTop: '7%',
                marginLeft: 20,
              }}>
              <>
                <Text style={{textAlign: 'center', fontSize: 15}} //onPress={()=> props.reduxSetNotifcationsAction([])}
                >
                  {data.data}
                </Text>
                <Text style={{fontWeight: 'bold'}}>{formatStoryDate(index)}</Text>
              </>
            </View>
          </View>
          <View style={styles(props).chatLine} />
        </React.Fragment>
        );
      });
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height}}>
          <Text style={{fontSize: 20}}> You have no Notifications</Text>
        </View>
      )
    }
  };

  return (
    <ScrollView scrollsToTop={false} contentContainerStyle={styles(props).menu}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Ionicons
          name="ios-arrow-back"
          size={30}
          onPress={() => props.closeNotifications()}
        />
        <Text style={{fontSize: 25}}>Notifications</Text>
      </View>
      <ScrollView>
        {renderNotifications()}
       </ScrollView>
    </ScrollView>
  );
}
const styles = (props: Props) =>
  StyleSheet.create({
    menu: {
      flex: 1,
      width: window.width,
      height: window.height,
      backgroundColor: 'white',
      padding: 20,
    },
    chatLine: {
      marginTop: 1,
      borderBottomColor: '#F1F2F3',
      borderBottomWidth: 1.5,
      width: '100%',
      alignSelf: 'flex-end',
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    notifications: state.notifications.notifications,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SetNotificationActionType>) => {
  return {
    reduxSetNotifcationsAction: (item: any) =>
      dispatch(SetNotificationsAction(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
