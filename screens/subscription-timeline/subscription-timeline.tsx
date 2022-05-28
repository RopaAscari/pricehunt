import Video from 'react-native-video';
import {merchants} from '@data/app-data';
import React, {useEffect, useState} from 'react';
import {Portal, Provider} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal,
  Animated,
  PanResponder,
  Alert,
  Image,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StoryProgress from '@components/progress-bar/progress-bar';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Lightbox from '@components/light-house/Lightbox';

type Props = {};

function SubscriptionTimeline(props: Props) {
  const [currentMerchant, setCurrentMerchant] = useState(0);
  const [stop, stopStory] = useState(false);
  const [story, changeStory] = useState(0);
  const [reset, resetStory] = useState(false);
  const [visible, setVisibility] = useState(false);
  const [swipe, setSwipeState] = React.useState(0);

  const position = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      return true;
    },

    onPanResponderMove: (event, gesture) => {
      position.setValue({x: gesture.dx, y: gesture.dy});
      //stopStory(true)
    },

    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.vy > 0) {
        closeStory();
      }
    },

    onPanResponderGrant: ({nativeEvent: {touches}}, {x0, y0, moveX}) => {
      if (x0 > Dimensions.get('window').width / 2) {
        story === merchants[story].stories.length - 1
          ? null
          : changeStory(story + 1); // resetStory(false)
      } else {
        story === 0 ? null : changeStory(story - 1); // resetStory(true)
      }
    },
  });

  const closeStory = () => {
    setVisibility(false);
    changeStory(0);
  };

  const nextStory = () => {
    changeStory(story + 1);
  };

  const renderStories = () => {
    return merchants.map((i, k) => {
      i.stories.length === story ? (i.allStoriesWatched = true) : null;

      return (
        <React.Fragment key={k}>
          <Lightbox
            onOpen={() => setCurrentMerchant(k)}
            renderContent={() => renderStoryContent(k)}>
            <View
              style={{
                height: 80,
                width: 80,
                borderWidth: 3,
                borderColor: '#6500C4',
                borderRadius: 300,
                marginLeft: 20,
              }}>
              {
                <Image
                  resizeMode="cover"
                  source={{uri: i.stories[0].media}}
                  style={{
                    position: 'absolute',
                    width: 75,
                    height: 75,
                    opacity: i.stories[0].watched ? 0.5 : 1,
                    borderRadius: 300,
                  }}
                />
              }
            </View>
          </Lightbox>
          {/*
          <View style={{width: 60, left: 40}}>
            <Text
              numberOfLines={1}
              style={{fontFamily: 'Montserrat-Bold', fontSize: 15}}>
              {i.merchantName}
            </Text>
</View>*/}
        </React.Fragment>
      );
    });
  };

  const renderStoryContent = (k: any) => {
    //setCurrentMerchant(k)
    return merchants[currentMerchant].stories
      .filter((item: any, index: any) => {
        return index === story;
      })
      .map((i: any, k: any) => {
        return (
          <React.Fragment key={k}>
            {i.type === 'video' ? (
              <Video
                resizeMode="cover"
                source={{uri: i.media}}
                style={{
                  height: '100%',
                  width: '100%',
                  zIndex: -999,
                }}>
                {
                  renderStoryBars()
                }
              </Video>
            ) : (
              <ImageBackground
                resizeMode="cover"
                source={{uri: i.media}}
                style={{height: '100%', width: '100%'}}>
                {
                  //renderStoryBars()
                }
              </ImageBackground>
            )}
          </React.Fragment>
        );
      });
  };

  const renderStoryProperties = () => {
    return (
      <Animated.View
        style={[position.getLayout()]}
        {...panResponder.panHandlers}>
        {renderStoryContent()}
      </Animated.View>
    );
  };

  const renderStoryBars = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          zIndex: 10,
          elevation: 10,
          justifyContent: 'space-around',
          marginLeft: '1%',
          marginRight: '1%',
        }}>
        {merchants[currentMerchant].stories.map((item: any, index: any) => {
          return (
            <StoryProgress
              stop={stop}
              key={index}
              reset={reset}
              nextStory={nextStory}
              closeStory={closeStory}
              active={story === index ? true : false}
              storyAmount={merchants[currentMerchant].stories.length}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles(props).body}>
      <Text style={styles(props).viewStoresText}>VIEW STORIES</Text>
      <ScrollView
        horizontal={true}
        decelerationRate={0}
        alwaysBounceHorizontal={true}
        snapToInterval={200} //your element width
        snapToAlignment={'center'}
        pagingEnabled={true}
        // contentContainerStyle={{ right: 30}}
        style={styles(props).carousel}
        contentContainerStyle={{paddingRight: 100}}
        showsHorizontalScrollIndicator={false}>
        {renderStories()}
      </ScrollView>
      {/*  <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={closeStory}
              style={styles(props).modalContainer}>
              <Animated.View
                style={[position.getLayout()]}
                {...panResponder.panHandlers}>
                {renderStoryContent() }
              </Animated.View>
            </Modal>
          </Portal>
      </Provider>*/}
    </View>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      flex: 1,

      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: 'black',
      padding: 8,
    },
    progressBar: {
      flexDirection: 'row',
      height: 12,
      width: '100%',
      backgroundColor: 'transparent',
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 25,
    },
    body: {
      height: '100%',
      backgroundColor: 'white',
    },
    backgroundVideo: {
      // position: 'absolute',
      height: '100%',
      width: '100%',
      // top: 0,
      //left: 0,
      // bottom: 0,
      // right: 0,
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      height: hp(40),
      width: wp(80),
      alignSelf: 'center',
      borderRadius: 25,
    },
    viewStoresText: {
      fontSize: 18,
      //marginTop: '10%',
      padding: 10,
      fontFamily: 'Roboto-Bold',
      color: '#2E2E2E',
    },
    carousel: {
      height: 100,
      width: Dimensions.get('window').width,
      marginTop: 10,
      marginLeft: 20,
      elevation: 10,
      zIndex: 10,
      marginRight: 10,
    },
  });

export default SubscriptionTimeline;
