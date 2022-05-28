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
import { ValidateUserPresence } from 'firebase/functions/user-presence';

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
};

class ChatScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      chats: [],
      message: {},
      reset: false,
      noChats: false,
      refresh: false,
    };
  }

  async componentDidMount() {
    await this.getAllUserChats();

    return () => {
      this.getAllUserChats();
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

  getAllUserChats = async () => {
    try {
      await firestore()
        .collection('CHATS')
        .where('merchant.id', '==', this.props.user._id)
        .onSnapshot(querySnapshot => {
          this.setState({chats: querySnapshot.docs});
          querySnapshot.docs.length === 0
            ? this.setState({noChats: true})
            : null;
        });
    } catch (error) {
      console.log(error);
    }
  };

  getUserPresence = async () => {};

  enterChat = (chatData: any) => {
    this.props.navigation.navigate('Merchant-Messaging');
    this.props.reduxSetChatMesssages(chatData.data());
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
    console.log('Latest',latest)
    if (message != undefined) {
      if (message.text !== '') {
        return (
          <View>
            {latest.sentBy === 'merchant' ? (
              <Text> {message.text} </Text>
            ) : (
              <Text style={{fontWeight: 'bold'}}> {message.text} </Text>
            )}
          </View>
        );
      } else if (message.image !== undefined) {
        return (
          <View>
            {latest.sentBy === 'merchant' ? (
              <Text> Sent a photo </Text>
            ) : (
              <Text>You received a photo</Text>
            )}
          </View>
        );
      } else if (message.audio !== undefined) {
        return (
          <View>
            {latest.sentBy === 'merchant' ? (
              <Text>Sent a voice message</Text>
            ) : (
              <Text>You received a voice message</Text>
            )}
          </View>
        );
      } else if (message.video !== undefined) {
        return (
          <View>
            {latest.sentBy === 'merchant' ? (
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
        <TouchableHighlight style={styles(this.props).deleteButtonContainer}>
          <View style={styles(this.props).row}>
            <Text style={styles(this.props).deleteButtonText}>Delete </Text>
            <Trash name="trash" color="white" size={25} />
          </View>
        </TouchableHighlight>
      );
    };
    if (this.state.chats.length > 0) {
      return this.state.chats.map((chatData, index) => {
        return (
          <Swipeable key={index} renderRightActions={rightSwipe}>
            <TouchableNativeFeedback onPress={() => this.enterChat(chatData)}>
              <View style={styles(this.props).chatContainer}>
                <View style={[styles(this.props).row, {marginTop: '4%'}]}>
                  <Image
                    source={{
                      uri: chatData.data().hunter.photo, //'https://pricehunt101.s3.us-east-2.amazonaws.com/IMG-1837.jpg',
                    }}
                    style={styles(this.props).imageConatiner}
                  />
                  <View style={styles(this.props).chatUserContainer}>
                    <View style={styles(this.props).chatUserSecondaryContainer}>
                      <Text style={styles(this.props).chatUserText}>
                        {chatData.data().hunter.name}
                      </Text>
                      <Text style={styles(this.props).chatUserTime}>
                        {//chatData.data().latestMessage.createdAt
                        dayjs(chatData.data().latestMessage.createdAt).format(
                          'LT',
                        )}
                      </Text>
                    </View>
                    <View style={styles(this.props).row}>
                      {ValidateUserPresence(chatData.data().hunter.id)? (
                        <OnlineIcon
                          height={18}
                          width={18}
                          style={{right: 35, top: 13}}
                        />
                      ) : (
                        <OfflineIcon
                          height={18}
                          width={18}
                          style={{right: 35, top: 13}}
                        />
                      )}
                      <Text
                        style={[
                          styles(this.props).chatMessage,
                          {position: 'absolute'},
                        ]}>
                        {this.determineLatestMessageRender(
                          chatData.data().latestMessage,
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles(this.props).chatLine} />
              </View>
            </TouchableNativeFeedback>
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
    const options = {
      container: {
        // backgroundColor: '#FF0000',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
      },
      text: {
        fontSize: 25,
        color: 'black',
        marginLeft: 7,
      },
    };
    return (
      <React.Fragment>
        {this.props.network.networkConnection.isConnected ? (
          <View style={styles(this.props).body}>
            <View style={styles(this.props).chatHeaderContainer}>
              <View
                style={[styles(this.props).row, styles(this.props).content]}>
                <SearchIcon
                  name="search"
                  color="#EB3A31"
                  style={styles(this.props).iconPosition}
                  size={22}
                />
                <Text style={styles(this.props).chatHeader}>Messages</Text>
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
              contentContainerStyle={{flexGrow: 1}}
              style={styles(this.props).margin}>
              {this.state.chats.length < 0 ? (
                <ActivityIndicator size="large" color="red" />
              ) : (
                this.renderChats()
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
      fontSize: 23,
      color: '#EB3A31',
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
      marginTop: '2%',
      color: 'grey',
    },
    margin: {
      // marginLeft: '5%',
      //  height: '100%'
    },
    imageConatiner: {
      height: 70,
      width: 70,
      borderRadius: 200,
      resizeMode: 'cover',
    },
    chatContainer: {
      marginLeft: '5%',
      // marginTop: '4%',
      backgroundColor: 'white',
    },
    chatLine: {
      borderBottomColor: '#F1F2F3',
      borderBottomWidth: 1.5,
      width: 365,
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
