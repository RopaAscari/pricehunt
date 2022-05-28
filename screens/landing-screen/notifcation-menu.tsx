import React from 'react';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
    closeNotifications: () => void
}

export default function NotificationsMenu(props: Props) {
  return (
    <React.Fragment>
      <Ionicons
        name="ios-arrow-back"
        size={30}
        onPress={() => props.closeNotifications()}
      />
      <View
        style={{
          height: '100%',
          width: '100%',
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Notifications Loading...</Text>
      </View>
    </React.Fragment>
  );
}
