import dayjs from 'dayjs';
import React, {Component} from 'react';
import {
  Text,
  TouchableNativeFeedback,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  RefreshControl,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {store} from '@store/store';
import {userChatData} from '@data/app-data';
import OnlineIcon from '@icons/online-icon';
import {SearchBar} from 'react-native-elements';
import Dot from 'react-native-vector-icons/Entypo';
import OfflineIcon from '@icons/offline-icon';
import Trash from 'react-native-vector-icons/Entypo';
import {NavigationScreenProp} from 'react-navigation';
import {RootState} from '@reducers/combined-reducers';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import {ShowBarActionType} from '@constants/router-types';
import {ChatType, User} from '@constants/type-definitions';
import SearchIcon from 'react-native-vector-icons/Fontisto';
import {SetMessageActionType} from '@constants/message-types';
import {SetNetworkAction} from '@actions/set-network-action';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {SetChatMessagesAction} from '@actions/set-chat-messages';
import {CreateChatActionType} from '@constants/create-chat-types';
import StatusCircle from 'react-native-vector-icons/MaterialIcons';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CreateChatInstanceAction} from '@actions/create-chat-instance-action';
import {ToggleRouterBarVisibilityAction} from '@actions/toggle-router-bar-visibility-action';
import {ValidateUserPresence} from 'firebase/functions/user-presence';
import {cos} from 'react-native-reanimated';
import Stories from '@components/render-stories/screens/Stories';
import Input from '@components/input/input';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  user: User;
  network: any;
  navigation: NavigationScreenProp<any, any>;
  reduxSetChatMesssages: (messages: any) => void;
  reduxToggleRouterBarVisibilityAction: (visiblility: boolean) => void;
};

type State = {
  message: any;
  reset: boolean;
  noChats: boolean;
  refresh: boolean;
  chats: Array<any>;
  reRender: number;
  chatsResolved: Array<any>;
};

class ChatScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      chats: [],
      message: {},
      reRender: 0,
      reset: false,
      noChats: false,
      refresh: false,
      chatsResolved: [],
    };
  }

  async componentDidMount() {
    this.chatListener();
    this.getUserPresence();

    return () => {
      this.chatListener();
      this.getUserPresence();
    };
  }

  checkNetworkConnection = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        showMessage({
          message: 'No Internet Connection',
          type: 'warning',
          icon: 'warning',
        });
        store.dispatch(SetNetworkAction(state));
      }
    });
  };

  chatListener = async () => {
    try {
      firestore()
        .collection('CHATS')
        .where('hunter.id', '==', this.props.user._id)
        .onSnapshot(querySnapshot => {
          this.resolveChats(querySnapshot.docs);
          querySnapshot.docs.length === 0
            ? this.setState({noChats: true})
            : null;
        });
    } catch (error) {
      console.log(error);
    }
  };

  getUserPresence = async () => {
    try {
      firestore()
        .collection('USER_PRESENCE')
        .onSnapshot(() => {
          this.chatListener();
        });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  renderMessageTime = (data: any) => {
    const current = Math.abs(
      (data.chat.latestMessage.createdAt - new Date().getTime()) / 3600000,
    );

    if (Math.round(current) < 24) {
      return dayjs(data.chat.latestMessage.createdAt).format('LT');
    } else if (Math.round(current) >= 24 && Math.round(current) < 168) {
      return dayjs(data.chat.latestMessage.createdAt).format('dddd');
    } else if (Math.round(current) > 168 && Math.round(current) < 8760) {
      return (
        dayjs(data.chat.latestMessage.createdAt).format('MMMM') +
        ' ' +
        dayjs(data.chat.latestMessage.createdAt).format('DD')
      );
    } else {
      return dayjs(data.chat.latestMessage.createdAt).format('L');
    }
  };

  getExistingStories = async (merchantId: string) => {
    const merchantStories = await firestore()
      .collection('STORIES')
      .doc(merchantId)
      .get();

    if (merchantStories.exists) {
      return merchantStories.data(); //.length > 0? this.setState({ currentMerchantStories:  merchantStories.data()}) : null
    }
  };

  resolveChats = async (chats: any) => {
    const results = chats.map(async obj => {
      const chat = obj.data();
      const presence = await ValidateUserPresence(obj.data().merchant.id);
      const stories = await this.getExistingStories(obj.data().merchant.id);
      return {chat, presence, stories};
    });

    Promise.all(results).then(resolved => {
      this.setState({chatsResolved: resolved});
    });
  };

  enterChat = (chatData: any) => {
    this.props.navigation.navigate('Message');
    this.props.reduxSetChatMesssages(chatData);
    this.props.reduxToggleRouterBarVisibilityAction(false);
  };

  refreshListView = () => {
    this.setState({refresh: true});
    this.setState({refresh: false});
  };

  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refresh}
        onRefresh={() => this.refreshListView()}
      />
    );
  }

  determineLatestMessageRender = (latest: any) => {
    const message = latest.message;
    if (message != undefined) {
      if (message.text !== '') {
        return (
          <View>
            {latest.sentBy === 'hunter' ? (
              <Text> {message.text} </Text>
            ) : (
              <Text style={{fontWeight: 'bold'}}> {message.text} </Text>
            )}
          </View>
        );
      } else if (message.image !== undefined) {
        return (
          <View>
            {latest.sentBy === 'hunter' ? (
              <Text> Sent a photo </Text>
            ) : (
              <Text>You received a photo</Text>
            )}
          </View>
        );
      } else if (message.audio !== undefined) {
        return (
          <View>
            {latest.sentBy === 'hunter' ? (
              <Text>Sent a voice message</Text>
            ) : (
              <Text>You received a voice message</Text>
            )}
          </View>
        );
      } else if (message.video !== undefined) {
        return (
          <View>
            {latest.sentBy === 'hunter' ? (
              <Text>Sent a video</Text>
            ) : (
              <Text>You sent a video</Text>
            )}
          </View>
        );
      }
    }
  };

  renderChats = () => {
    const rightSwipe = () => {
      return (
        <React.Fragment>
          <View style={{flexDirection: 'row', elevation: 5}}>
        <TouchableHighlight style={[styles(this.props).deleteButtonContainer,{backgroundColor:'grey'}]}>
        <View style={styles(this.props).row}>
          <Text style={styles(this.props).deleteButtonText}>Read </Text>
         { //<Trash name="trash" color="white" size={25} />
         }
        </View>
      </TouchableHighlight>
        <TouchableHighlight style={styles(this.props).deleteButtonContainer}>
          <View style={styles(this.props).row}>
            <Text style={styles(this.props).deleteButtonText}>Delete </Text>
            <Trash name="trash" color="white" size={25} />
          </View>
        </TouchableHighlight>
        </View>
        </React.Fragment>
      );
    };

    if (this.state.chatsResolved.length > 0) {
      return this.state.chatsResolved.map((data, index) => {
        //console.log(data.stories);
        //  this.renderMessageTime(data);
        return (
          <Swipeable key={index} renderRightActions={rightSwipe}>
            <TouchableOpacity onPress={() => this.enterChat(data)}>
              <React.Fragment>
                <View style={{flexDirection: 'row'}}>
                <Dot name="dot-single" color="#1D81E8" size={25} style={{ top: 30 }}/>
                  <View
                    style={{
                      height: 80,
                      marginTop: 10,
                      width: Dimensions.get('window').width,
                    }}>
                    <View style={{marginLeft: 15, flexDirection: 'row'}}>
                      {data.stories === undefined ? (
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={{
                              uri: data.chat.merchant.photo, //'https://pricehunt101.s3.us-east-2.amazonaws.com/IMG-1837.jpg',
                            }}
                            style={styles(this.props).imageConatiner}
                          />
                          {data.presence ? (
                            <OnlineIcon
                              height={18}
                              width={18}
                              style={{right: 10, top: 30}}
                            />
                          ) : (
                            <OfflineIcon
                              height={18}
                              width={18}
                              style={{right: 10, top: 30}}
                            />
                          )}
                        </View>
                      ) : (
                        <Stories
                          viewer={'hunter'}
                          viewport={'messaging'}
                          stories={[data.stories]}
                          navigation={this.props.navigation}
                        />
                      )}
                      <View style={{marginLeft: 15, marginTop: 5}}>
                        <Text
                          style={[
                            styles(this.props).chatUserText,
                            {
                              color: 'black',
                              fontFamily: 'Roboto-Regular',
                             // fontWeight: 'bold',
                            },
                          ]}>
                          {data.chat.merchant.name}
                        </Text>
                        <Text
                          style={
                            {
                              color: '#8A8A8A',
                              fontFamily: 'Roboto-Regular',
                              marginTop: 5,
                            }
                            // styles(this.props).chatMessage,
                          }>
                          {this.determineLatestMessageRender(
                            data.chat.latestMessage,
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: 'black',
                      right: 20,
                      position: 'absolute',
                      marginTop: 15,
                    }}>
                    {this.renderMessageTime(data)}
                  </Text>
                </View>
                <View style={styles(this.props).chatLine} />
              </React.Fragment>
            </TouchableOpacity>
          </Swipeable>
        );
      });
    } else {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', top: '40%'}}>
          <Text style={{fontSize: 20, color: '#404040'}}>
            {this.state.noChats ? 'You have no chats' : ''}
          </Text>
        </View>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.network.networkConnection.isConnected ? (
          <View style={styles(this.props).body}>
            <View style={styles(this.props).chatHeaderContainer}>
           
              <View
                style={[styles(this.props).row, styles(this.props).content]}>
                <View style={{flexDirection: 'row', top: 15}}>   
                
                  <Image
                    source={{uri: this.props.user.profilePic}}
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 200,
                      resizeMode: 'contain',
                    }}
                  />
                  <OnlineIcon
                    height={18}
                    width={18}
                    style={{right: 10, top: 15}}
                  />
                </View>

                <Text style={styles(this.props).chatHeader}>Conversations</Text>
                <EditIcon
                  name="square-edit-outline"
                  color="#EB3A31"
                  style={styles(this.props).iconPosition}
                  size={27}
                />
              </View>
            </View>
            <ScrollView
              refreshControl={this.refreshControl()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1, marginTop: 20}}
              style={styles(this.props).margin}>
              {this.state.chatsResolved.length < 0 ? (
                <ActivityIndicator size="large" color="red" />
              ) : (
                <View>
                  <Input leftIcon={< Icon
                 // onPress={() => navigateToPriceHub(searchParam)}
                  name="md-search-sharp"
                  color="#FF4C52"
                  size={25}
                />} mode="outlined" placeholder="Search Conversations" theme={{roundness:10}} style={{ fontSize:17, alignSelf:'center',width: 400, height: 40}}/>
                  {this.renderChats()}
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              flex: 1,
            }}>
            <Text style={{fontSize: 28}}> You are not connected</Text>
            <Image
              source={require('../../assets/images/no-net.jpg')}
              style={{
                marginTop: 10,
                height: 200,
                width: 200,
                resizeMode: 'contain',
              }}
            />
            <Text style={{fontSize: 18, marginTop: 10}}>
              Your internet connection is not{' '}
            </Text>
            <Text style={{fontSize: 18}}>stable tap below to refresh</Text>
            <TouchableOpacity
              style={{
                marginTop: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                height: 32,
                width: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.checkNetworkConnection()}>
              <Text style={{fontSize: 18}}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </React.Fragment>
    );
  }
}

const styles = (props: Props) =>
  StyleSheet.create({
    body: {
      flex: 1,
      height: '100%',
      backgroundColor: 'white',
    },
    iconPosition: {
      top: 25,
    },
    deleteButtonContainer: {
      backgroundColor: '#EB3A31',
      height: '100%',
      width: 130,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteButtonText: {
      fontSize: 20,
      color: 'white',
      // marginLeft: 15,
    },
    content: {
      padding: 10,
      bottom: 10,
      justifyContent: 'space-between',
    },
    chatUserSecondaryContainer: {
      flexDirection: 'row',
      width: '100%',
    },
    chatUserContainer: {
      marginLeft: '5%',
      height: 100,
    },
    chatUserTime: {
      left: 305,
      fontSize: 13,
      alignSelf: 'flex-end',
      position: 'absolute',
    },
    row: {
      flexDirection: 'row',
    },
    chatHeader: {
      alignSelf: 'center',
      padding: 20,
      fontWeight: 'bold',
      fontSize: 23,
      color: '#373737',
    },
    chatHeaderContainer: {
      height: '7.5%',
      borderBottomWidth: 3,
      borderBottomColor: '#F1F2F3',
    },
    chatUserText: {
      fontSize: 19,
    },
    chatMessage: {
      // alignSelf: 'flex-start',
      // marginTop: '2%',
      color: 'white',
    },
    margin: {
      // marginLeft: '5%',
      //  height: '100%'
    },
    imageConatiner: {
      height: 60,
      width: 60,
      borderRadius: 200,
      resizeMode: 'cover',
    },
    chatContainer: {
      marginLeft: '5%',
      height: 100,
      backgroundColor: 'white',
    },
    chatLine: {
      borderBottomColor: '#F1F2F3',
      borderBottomWidth: 1.5,
      width: Dimensions.get('window').width - 25,
      alignSelf: 'flex-end',
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
    theme: state.theme.theme,
    network: state.network,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<
    SetMessageActionType | ShowBarActionType | CreateChatActionType
  >,
) => {
  return {
    reduxSetChatMesssages: (chatObj: ChatType) =>
      dispatch(CreateChatInstanceAction(chatObj)),
    reduxToggleRouterBarVisibilityAction: (visibility: boolean) =>
      dispatch(ToggleRouterBarVisibilityAction(visibility)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);
