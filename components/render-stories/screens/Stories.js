import {connect} from 'react-redux';
import React, { useRef, useState,useEffect } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Modal from 'react-native-modalbox';
import { CubeNavigationHorizontal } from '@components/cube-navigation';
import AllStories from '../constants/AllStories';
import StoryContainer from '../components/StoryContainer';
import {SetCurrentMerchantStoryAction} from '@actions/set-current-merchnat-story'

const Stories = (props) => {
  const [viewed, setViewedStory] = useState(false)
  const [indices, setIndeces] = useState([])
  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);

  useEffect(() => {
  })

  const viewedLastStory = (index) => {
    props.reRenderStory()
    setViewedStory(true)
   // console.log(indices)
  }
  
  const onStorySelect = (index, item) => {
   props.reduxSetCurrentMerchantStoryAction(item.id)
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
    if(props.mapMarkerPressCallback !== undefined) props.mapMarkerPressCallback()
  };

  const onStoryNext = (isScroll) => {
    const newIndex = currentUserIndex + 1;
    if (AllStories.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious();
      setCurrentScrollValue(scrollValue);
    }
  };

  const renderSeperator = () => (
    <View style={{ height: 1, backgroundColor: '#ccc' }} />
  );

  if(props.mapMarkerPress) {
   // onStorySelect(currentUserIndex)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={props.stories}
        horizontal
        //itemSeparator={()=> {<View style={{marginLeft: 10}}/>}}
        renderItem={({ item, index }) => {
          const watched = props.stories[index].stories[props.stories[index].stories.length - 1].users.includes(props.userS._id);
          return (
          <TouchableOpacity key={index} onPress={() => onStorySelect(index, item)}>
            <Image
              style={[ styles.circle, { opacity: watched? 0.4: 1 , borderColor: watched? 'transparent': '#A271FF'} ]}
              source={{ uri: item.profile }}
              isHorizontal
            />
           { props.viewer === 'merchant' || props.viewport === 'messaging'? null: 
              <View style={{width: 66}}>
                  <Text numberOfLines={1} style={[styles.title, { opacity:  watched? 0.3: 1}]}>{item.title}</Text>
              </View>
            }
          </TouchableOpacity>
        )}}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={ props.mapMarkerPress?props.mapMarkerPress:isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        {/* eslint-disable-next-line max-len */}
        <CubeNavigationHorizontal callBackAfterSwipe={g => onScrollChange(g)} ref={modalScroll} style={styles.container}>
          {props.stories.map((item, index) => (
            <StoryContainer
              key={index}
              delete={props.delete}
              viewport={props.viewport}
              navigation={props.navigation}
              viewer={props.viewer}
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              user={item}
              viewedLastStory={viewedLastStory}
              index={index}
             // storiesObj={props.stories}
              isNewStory={index !== currentUserIndex}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  //  flex: 1,
    //justifyContent: 'flex-start',
    //paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  circle: {
    width: 66,
    margin: 6,
    height: 66,
    borderRadius: 33,
    borderWidth: 2.4,
   //borderColor: '#A271FF'
  },
  modal: {
    flex: 1,
  },
  title: {
    color:'black',
    fontSize: 12.5, textAlign: 'center',
    fontFamily: 'Roboto-Medium'
  },
});


const mapDispatchToProps = dispatch => {
  return {
    reduxSetCurrentMerchantStoryAction: id =>
       dispatch(SetCurrentMerchantStoryAction(id)),
    // reduxCreateChatInstanceAction: chatObj =>
    //   dispatch(CreateChatInstanceAction(chatObj)),
  };
};

const mapStatetoProps = state => {
  return {
    item: state.item.item,
    userS: state.user.user,
    theme: state.theme.theme,
    storeRef: state.storeRef.storeRef,
    isloggenIn: state.session.isloggenIn,
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Stories);