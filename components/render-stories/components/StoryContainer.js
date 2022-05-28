import {connect} from 'react-redux';
import React, {useState, createRef, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';
import Modal from '@components/rn-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import Story from './Story';
import UserView from './UserView';
import Readmore from './Readmore';
import ProgressArray from './ProgressArray';
import {WebView} from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ActionSheet from 'react-native-actions-sheet';
import firestore from '@react-native-firebase/firestore';

const SCREEN_WIDTH = Dimensions.get('window').width;
const actionSheetRef = createRef();

const StoryContainer = props => {
  let actionSheet;

  const {user} = props;
  const {stories = []} = user || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModelOpen, setModel] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(3);

  const evaluateStory = (stories) => {
    if(stories[props.index] !== undefined){
        return stories[props.index].users.includes(props.userS._id)
    }else{
      return {}
    }
  }

  //const story = evaluateStory(stories) && evaluateStory(stories) !== {} ? stories[props.index] : stories[currentIndex];
  const story = stories.length ? stories[currentIndex] : {};
  const {isReadMore, url} = story || {};

  

  useEffect(() => {
  }, []);


  const changeStory = evt => {
    if (evt.locationX > SCREEN_WIDTH / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };

  const nextStory = () => {
    trackWatchedStories()
    if (stories.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryNext();
    }
  };

  const prevStory = () => {
    if (currentIndex > 0 && stories.length) {
      setCurrentIndex(currentIndex - 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryPrevious();
    }
  };

  const trackWatchedStories = () => {
    
    if(stories.length - 1 === currentIndex){
      props.viewedLastStory()
    }

    firestore()
      .collection('STORIES')
      .doc(props.curId)
      .get()
      .then(async doc => {
        let stories = doc.data().stories;
        const viewed = stories[currentIndex].users.includes(props.userS._id);
        if (!viewed) {
          stories[currentIndex].users.push(props.userS._id);
          await doc.ref
            .update({
              stories: stories,
            })
            .catch(err => {
              console.err(err);
            });
        }
      });
  };

  const onImageLoaded = () => {
    setLoaded(true);
    trackWatchedStories();
  };

  const onVideoLoaded = length => {
    setLoaded(true);
    setDuration(length.duration);
    trackWatchedStories();
  };

  const onPause = result => {
    setIsPause(result);
  };

  const onReadMoreOpen = () => {
    setIsPause(true);
    setModel(true);
  };
  const onReadMoreClose = () => {
    setModel(false);
  };

  const pauseFromReply = () => {
    setIsPause(true);
  };

  const playFromReply = () => {
    setIsPause(false);
  };

  const closeModalFromReply = () => {
    props.onClose();
  };

  const manageActionSheet = () => {
    onPause(true);
    actionSheetRef.current?.setModalVisible();
  };

  const dotIcon = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          justifyContent: 'space-between',
          bottom: 25,
        }}>
        <View style={{flexDirection: 'row', right: 160}}>
          <AntDesign name="eye" color="white" size={30} />
          <Text style={{color: 'white', fontSize: 17, top: 3}}>
            {' '}
            {story.users.length}
          </Text>
        </View>
        <View>
          <Entypo
            onPress={() => {
              manageActionSheet();
            }}
            name="dots-three-horizontal"
            style={{
              left: 160,
            }}
            size={35}
            color="white"
          />
        </View>
      </View>
    );
  };

  const deleteStory = storyId => {
    firestore()
      .collection('STORIES')
      .doc(user.id)
      .update({
        stories: stories.filter(story => story.id !== storyId),
      })
      .then(() => {
        nextStory();
        actionSheetRef.current?.hide();
        props.delete();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loading = () => {
    if (!isLoaded) {
      return (
        <View style={styles.loading}>
          <View style={{width: 1, height: 1}}>
            <Story
              viewer={props.viewer}
              onImageLoaded={onImageLoaded}
              pause
              onVideoLoaded={onVideoLoaded}
              story={story}
            />
          </View>
          <ActivityIndicator color="white" />
        </View>
      );
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onSwipeDown = () => {
    if (!isModelOpen) {
      props.onClose();
    } else {
      setModel(false);
    }
  };

  const onSwipeUp = () => {
    if (!isModelOpen && isReadMore) {
      setModel(true);
    }
  };

  return (
    <GestureRecognizer
      onSwipeDown={onSwipeDown}
      onSwipeUp={onSwipeUp}
      config={config}
      style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        delayLongPress={500}
        onPress={e => changeStory(e.nativeEvent)}
        onLongPress={() => onPause(true)}
        onPressOut={() => onPause(false)}
        style={styles.container}>
        <View style={styles.container}>
          <Story
            onImageLoaded={onImageLoaded}
            pause={isPause}
            isNewStory={props.isNewStory}
            onVideoLoaded={onVideoLoaded}
            story={story}
            id={user.id}
          />

          {loading()}

          <UserView
            time={
              user.stories[currentIndex].date === undefined
                ? user.stories[currentIndex - 1].date
                : user.stories[currentIndex].date
            }
            viewer={props.viewer}
            name={user.username}
            id={user.id}
            profile={user.profile}
            onClosePress={props.onClose}
          />

          {isReadMore &&
            props.viewer !== 'merchant' &&
            user.id !== 'pricehunt' && (
              <Readmore
                story={user.stories[currentIndex].url}
                playStory={playFromReply}
                pauseStory={pauseFromReply}
                merchant={user}
                navigation={props.navigation}
                closeModal={closeModalFromReply}
              />
            )}

          {props.viewer === 'merchant' ? dotIcon() : null}

          <ProgressArray
            next={nextStory}
            isLoaded={isLoaded}
            duration={duration}
            pause={isPause}
            isNewStory={props.isNewStory}
            stories={stories}
            currentIndex={currentIndex}
            currentStory={stories[currentIndex]}
            length={stories.map((_, i) => i)}
            progress={{id: currentIndex}}
          />
        </View>

        <Modal
          style={styles.modal}
          position="bottom"
          isOpen={isModelOpen} //onClosed={onReadMoreClose}
        >
          <View style={styles.bar} />
          <WebView source={{uri: 'https://www.google.com'}} />
        </Modal>

        <ActionSheet
          ref={actionSheetRef}
          openAnimationSpeed={17}
          onClose={() => onPause(false)}>
          <View style={{height: 150, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => deleteStory(user.stories[currentIndex].id)}>
              <Text style={{marginTop: 5, fontSize: 20, color: 'black'}}>
                Delete
              </Text>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 15,
                borderBottomWidth: 2.5,
                borderBottomColor: '#E9E9E9',
                width: '90%',
              }}
            />

            <TouchableOpacity>
              <Text style={{marginTop: 5, fontSize: 20, color: 'black'}}>
                Share Link
              </Text>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 15,
                borderBottomWidth: 2.5,
                borderBottomColor: '#E9E9E9',
                width: '90%',
              }}
            />

            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <Text style={{marginTop: 5, fontSize: 20, color: 'black'}}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </ActionSheet>
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingTop: 30,
    backgroundColor: 'red',
  },
  progressBarArray: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '98%',
    height: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  content: {width: '100%', height: '100%'},
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bar: {
    width: 50,
    height: 8,
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    //reduxToggleRouterBarVisibilityAction: visibility =>
    //   dispatch(ToggleRouterBarVisibilityAction(visibility)),
    // reduxCreateChatInstanceAction: chatObj =>
    //   dispatch(CreateChatInstanceAction(chatObj)),
  };
};

const mapStatetoProps = state => {
  return {
    item: state.item.item,
    userS: state.user.user,
    theme: state.theme.theme,
    curId: state.currentStoryId.id,
    storeRef: state.storeRef.storeRef,
    isloggenIn: state.session.isloggenIn,
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(StoryContainer);
