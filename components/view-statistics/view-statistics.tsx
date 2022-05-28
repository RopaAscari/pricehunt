import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';

type Props = {};

export default function ViewStatistics(props: Props) {
  const [visits, updateStoreVisits] = useState(0);
  const [storeItems, updateStoreItems] = useState(0);
  const [subscribers, updateSubscriberCount] = useState(0);

  const visitNotification = () => {
    showMessage({
      message: 'A hunter just visited your store',
      icon: 'success',
    });
  };

  const subscriberNotification = () => {
    showMessage({
      message: 'A hunter just subscribed your store',
      icon: 'success',
    });
  };

  useEffect(() => {
    const subScriptionsListener = firestore()
      .collection('SUBSCRIPTIONS')
      .doc('12345').collection('USERS')
      .onSnapshot(querySnapShot => {
        const subscriptions = querySnapShot.docs.length
        updateSubscriberCount(subscriptions);
        subscriberNotification()
      });

    const storeVisitListener = firestore()
      .collection('VIEWS')
      .doc('12345')
      .onSnapshot(querySnapShot => {
        const views = querySnapShot.data();

        if (views !== undefined) {
          visitNotification();
          updateStoreVisits(views.views);
        }
      });

    return () => {
      storeVisitListener(), subScriptionsListener();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: 70,
          fontSize: 20,
          alignSelf: 'center',
          marginBottom: 50,
        }}>
        Statistics
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{marginLeft: 10, marginTop: 20, width: 130}}>
          <Text style={{alignSelf: 'center', fontSize: 17}}>
            Total Store Visits
          </Text>
          <Text style={{alignSelf: 'center', fontSize: 40}}>{visits}</Text>
        </View>
        <View style={{marginLeft: 10, marginTop: 20, width: 150}}>
          <Text style={{alignSelf: 'center', fontSize: 17}}>
            Subscription Count
          </Text>
          <Text style={{alignSelf: 'center', fontSize: 40}}>{subscribers}</Text>
        </View>
        <View style={{marginLeft: 10, marginTop: 20, width: 130}}>
          <Text style={{alignSelf: 'center', fontSize: 17}}>Store Items</Text>
          <Text style={{alignSelf: 'center', fontSize: 40}}>{storeItems}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems:'center'
  },
});
