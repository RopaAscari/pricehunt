import {Dispatch} from 'redux';
import RNFS from 'react-native-fs';
import {connect} from 'react-redux';
import {
  Send,
  Actions,
  IMessage,
  GiftedChat,
  SendProps,
  InputToolbar,
} from 'react-native-gifted-chat';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  
} from 'react-native-responsive-screen';
import VideoPlayer from 'react-native-video';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import SoundPlayer from '@components/sound-player';
import {UploadAudio} from '@services/audio-service';
import AudioRecord from 'react-native-audio-record';
import {UploadVideos} from '@services/video-service';
import {UploadImages} from '@services/image-service';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootState} from '@reducers/combined-reducers';
import {NavigationScreenProp} from 'react-navigation';
import Lightbox from '@components/light-house/Lightbox';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import {ShowBarActionType} from '@constants/router-types';
import {SetThemeActionStore} from '@constants/theme-types';
import {LIGHT, DARK, DEFAULT} from '@constants/theme-types';
import Camera from 'react-native-vector-icons/MaterialIcons';
import {SetUIThemeAction} from '@actions/set-ui-theme-action';
import React, {useCallback, useEffect, useState} from 'react';
import {DarkTheme} from '@theme/dark/setting-screen-dark-theme';
import PlayArrow from 'react-native-vector-icons/MaterialIcons';
import BackArrow from 'react-native-vector-icons/MaterialIcons';
import TypingAnimation from '@components/typing-animation/index';
import ChatIcon from 'react-native-vector-icons/FontAwesome';
import StatusCircle from 'react-native-vector-icons/MaterialIcons';
import MicrophoneIcon from 'react-native-vector-icons/FontAwesome';
import {LightTheme} from '@theme/light/setting-screen-light-theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pause from 'react-native-vector-icons/MaterialCommunityIcons';
import Store from 'react-native-vector-icons/MaterialCommunityIcons';
import Pending from 'react-native-vector-icons/MaterialCommunityIcons';
import SendIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ToggleRouterBarVisibilityAction} from '@actions/toggle-router-bar-visibility-action';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';

import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  NativeModules,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  LogBox,
  Alert,
  Modal,
  PermissionsAndroid,
  TouchableOpacity,
  PanResponder,
  GestureResponderEvent,
  BackHandler,
} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import Clipboard from '@react-native-community/clipboard';
import {ChatType} from '@constants/type-definitions';
import OfflineIcon from '@components/svg/icons/offline-icon';
import {OnlineIcon} from '@components/svg/icons/online-icon';

type Props = {
  user: any;
  theme: any;
  network: any;
  chatData: any;
  accountType: string
  chat: ChatType;
  navigation: NavigationScreenProp<any, any>;
  reduxSetUIThemeAction(theme: string): void;
  reduxToggleRouterBarVisibilityAction: (visiblility: boolean) => void;
};

function MerchantMessageScreen(props: Props) {
  const intialMessageState: IMessage = {
    _id: '',
    text: '',
    createdAt: 0,
    //image:'',
    user: {
      _id: '',
      name: '',
      avatar: '',
    },
  };

  const [textS, setText] = useState('');
  const [timer, setTimer] = useState(0);
  const [typing, isTyping] = useState(false);
  const [isVideo, setVideo] = useState(false);
  const [isAudio, setAudio] = useState(false);
  const [audioData, selectAudio] = useState('');
  const [videoData, selectVideo] = useState('');
  const [upload, uploadAsset] = useState(false);
  const [connected, setNetwork] = useState(true);
  const [isImage, selectImage] = useState(false);
  const [camera, utilizeCamera] = useState(false);
  const [imageData, imageSelector] = useState('');
  const [visible, setModalVisible] = useState(false);
  const [isRecording, recordingAudio] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [messages, setMessages] = useState([intialMessageState]);
  const [audioSpecs, getAudioSpecs] = useState({
    recordSecs: null as any,
    recordTime: '',
  });

  const memoizedValidationChatInstance = React.useCallback(() => {
    //validateChatInstance(props.chat.chatId)
  }, [props.chat.chatId]);

  const validateChatInstance = async (
    chat: any | undefined,
    messagesListener: Function,
  ) => {
   
    const instance = await firestore()
      .collection('CHATS')
      .doc(chat.chatId)
      .get();
    if (instance.exists) {

      if(chat.reply){
        addMessagesToFirestore(chat.reply)
      }
      messagesListener();
      console.log('chat exists, getting messages...');
    } else {
      createUserChatInstance(chat.chatId);
      console.log('chat doesnt exists, creating...');
    }
  };

  const createUserChatInstance = async (userChatId: string | undefined) => {
    const {hunter, merchant, chatId, latestMessage} = props.chat;

    const chat = {hunter, merchant, chatId, latestMessage};

    firestore()
      .collection('CHATS')
      .doc(userChatId)
      .set(chat)
      .catch(error => {
        console.log(error);
      });
  };

  const initializeAudioRecorder = () => {
    AudioRecorder.requestAuthorization().then(isAuthorised => {
      if (!isAuthorised) return;

      const audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        AudioEncodingBitRate: 32000,
      });

      AudioRecorder.onProgress = data => {
        console.log(data.currentTime)
       setTimer(data.currentTime);
      };
    });
  };

  useEffect(() => {
    //console.log('ute')
    if(props.chat.reply){
      addMessagesToFirestore(props.chat.reply)
    }
    LogBox.ignoreAllLogs();

    BackHandler.addEventListener('hardwareBackPress', navigateBack);

    const typingListener = firestore()
      .collection('USERS')
      .doc('1')
      .collection('CHATS')
      .doc('1')
      .collection('USER_2')
      .doc('2')
      .onSnapshot(querySnapshot => {});

    const messagesListener = firestore()
      .collection('CHATS')
      .doc(props.chat.chatId)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            //image:'',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: props.user.username,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => {
      messagesListener(),
       initializeAudioRecorder(),
        validateChatInstance(props.chat, messagesListener),
      BackHandler.removeEventListener('hardwareBackPress', navigateBack);
    };
  }, []);

  async function handleSend(messages: Array<IMessage>) {
    console.log('send');
    messages[0].createdAt = new Date().getTime();
    messages[0].pending = !props.network.networkConnection.isConnected;

    const currentMessage = messages[0];

    if (props.network.networkConnection.isConnected) {
      console.log('connected');
      await addMessagesToFirestore(currentMessage);
      //
    } else {
      console.log('pending');
      storePendingMessages(currentMessage);
    }
  }

  const addMessagesToFirestore = async (message: IMessage) => {
    firestore()
      .collection('CHATS')
      .doc(props.chat.chatId)
      .collection('MESSAGES')
      .add(message)
      .then(response => {
        setLatestMessage(message);
      })
      .catch(err => console.log(err));
  };

  const storePendingMessages = async (messages: IMessage) => {
    // Alert.alert('pending')
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (e) {
      console.log(e);
    }
  };

  const manageTyping = async (text: string) => {
    setText(text);

    await firestore()
      .collection('USERS')
      .doc('1')
      .collection('CHATS')
      .doc('1')
      .collection('LATEST')
      .doc('recent')
      .set({
        latestMessage: {
          textS,
          createdAt: new Date().getTime(),
        },
      });
  };

  const setLatestMessage = async (message: IMessage) => {
    await firestore()
      .collection('CHATS')
      .doc(props.chat.chatId)
      .update({
        latestMessage: {
          message,
          sentBy: props.accountType,
          createdAt: new Date().getTime(),
        },
      });
  };

  const deleteUserMessage = (id: number | string) => {
    var user_message = firestore()
      .collection('CHATS')
      .doc(props.chat.chatId)
      .collection('MESSAGES')
      .where('_id', '==', id);

    user_message
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const sendImagesInChat = async (
    props: Readonly<SendProps<IMessage>> &
      Readonly<{children?: React.ReactNode}>,
  ) => {
    const options: ImagePickerOptions = {
      title: 'Image Picker',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    let imgMessageObj = {
      id: '',
      text: '',
      image: '',
      createdAt: new Date().getTime(),
      user: {
        _id: '1',
      },
      pending: false,
    };

    ImagePicker.launchImageLibrary(
      options,
      async (response: ImagePickerResponse) => {
        if (response.uri) {
          uploadAsset(true);
          const image = {
            name: response.fileName,
            uri: response.uri,
            base64: response.data,
            type: 'image/jpeg',
          };
          const res = await UploadImages(image);
          const url = (await res.promise()).Location;
          imgMessageObj.image = url;
          uploadAsset(false);
          props.onSend !== undefined
            ? props.onSend(imgMessageObj, true)
            : Alert.alert('Sending message failed');
        } else {
          Alert.alert('Error: Unable to select image, try again');
        }
      },
    );
  };

  const sendVideoInChat = async (
    props: Readonly<SendProps<IMessage>> &
      Readonly<{children?: React.ReactNode}>,
  ) => {
    const options: ImagePickerOptions = {
      title: 'Video Picker',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(
      options,
      async (response: ImagePickerResponse) => {
        try {
          if (response.path !== undefined) {
            uploadAsset(true);
            const buffer = await RNFS.readFile(response.path, 'base64');
            let filename = response.path.substring(
              response.path.lastIndexOf('/') + 1,
              response.path.length,
            );

            const video = {
              name: encodeURIComponent(
                `${filename}-${new Date().getTime()}.mp4`,
              ),
              base64: buffer,
            };

            const res = await UploadVideos(video);
            const url = (await res.promise()).Location;

            const videoDataSet: IMessage = {
              _id: 34344663,
              text: '',
              video: url,
              createdAt: new Date().getTime(),
              user: {
                _id: '1',
              },
              pending: false,
            };

            uploadAsset(false);
            props.onSend !== undefined
              ? props.onSend(videoDataSet, true)
              : Alert.alert('Sending message failed');
          } else {
            Alert.alert('Error: Unable to select this video, try again');
          }
        } catch (error) {
          console.log(error);
        }
      },
    );
  };

  const useCamera = (
    props: Readonly<SendProps<IMessage>> &
      Readonly<{children?: React.ReactNode}>,
  ) => {
    const options: ImagePickerOptions = {
      mediaType: 'photo',
      //includeBase64: true,
    };

    ImagePicker.launchCamera(options, async (response: ImagePickerResponse) => {
      if (response) {
        const cameraImg = {
          name: response.fileName,
          base64: response.data,
        };

        const res = await UploadImages(cameraImg);
        const url = (await res.promise()).Location;

        let imgMessageObj = {
          id: 343443,
          text: '',
          image: url,
          createdAt: new Date().getTime(),
          user: {
            _id: '1',
          },
          pending: false,
        };
        props.onSend !== undefined
          ? props.onSend(imgMessageObj, true)
          : Alert.alert('Sending message failed');
      }
    });
  };

  const click = () => {
    Alert.alert('clicked');
    return true;
  };

  const getAudioPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions to use microphone',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the mic');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };



  const onStartAudioRecording = (
    event: GestureResponderEvent,
    props: Readonly<SendProps<IMessage>> &
      Readonly<{children?: React.ReactNode}>,
  ) => {
    startRecord(props);
    return true;
  };

  const onFinshedAudioRecording = (
    event: GestureResponderEvent,
    props: Readonly<SendProps<IMessage>> &
      Readonly<{children?: React.ReactNode}>,
  ) => {
    stopRecord(props);
    return true;
  };

  const startRecord = async ( props: Readonly<SendProps<IMessage>> &
    Readonly<{children?: React.ReactNode}>,) => {
    recordingAudio(true);

    const audioPath = AudioUtils.DocumentDirectoryPath + `audio-${new Date().getTime()}.aac`; 

    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
    await AudioRecorder.startRecording();
  };

  const stopRecord = async ( props: Readonly<SendProps<IMessage>> &
    Readonly<{children?: React.ReactNode}>,) => {
    
    recordingAudio(false);
    setTimer(0);

    const filePath = await AudioRecorder.stopRecording();

    const base64 = await RNFS.readFile(filePath, 'base64');

    const audio = {
      name: filePath.split(/[\\\/]/).pop(),
      base64: base64,
    };

    const res = await UploadAudio(audio);
    const url = (await res.promise()).Location;

    sendAudioToChat(props, url)
  };

  const sendAudioToChat = async (
    props: Readonly<SendProps<IMessage>> &
      Readonly<{children?: React.ReactNode}>, audioUrl: string
  ) => {
    const audioDataSet = {
      _id: 34344663,
      text: '',
      audio: audioUrl,
      createdAt: new Date().getTime(),
      user: {
        _id: '1',
      },
      pending: false,
    };
    props.onSend !== undefined
      ? props.onSend(audioDataSet, true)
      : Alert.alert('Sending message failed');
  };

  const audioTimer = () => {
    return (
      <View style={{left: 5, flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 20,
            color: 'red',
            // fontWeight: 'bold',
            marginBottom: 10,
            marginLeft: 10,
          }}>0:</Text>
        <Text style={{
            fontSize: 20,
            color: 'red',
            // fontWeight: 'bold',
            marginBottom: 10,
           // marginLeft: 10,
          }}>
       {Math.trunc(timer) < 10? '0'+ Math.trunc(timer): Math.trunc(timer)}
        </Text>
      </View>
    );
  };

  const playAudio = async(audio: string) => {
    setAudioPlaying(true);
      var sound = new Sound('https://pricehunt101.s3.us-east-2.amazonaws.com/01+Why+Would+I+Stop.mp3', '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }else{
          sound.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
        }) 
      };
    })
  };

  const stopAudio = () => {
    //audioRecorderPlayer.stopPlayer();
  };

  const renderMessageAudio = (props: any) => {

    const {currentMessage} = props;

    var sound = new Sound('https://pricehunt101.s3.us-east-2.amazonaws.com/01+Why+Would+I+Stop.mp3', '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }else{
        console.log('Able to play')
      }
    })


    return (
      <View 
      style={{flexDirection: 'row'}}>
        {audioPlaying ? (
         <React.Fragment>
            <Pause
              name="pause-circle-filled"
              color="white"
              size={35}
              onPress={() => sound.play()}
            />
             <View
              style={{
                width: 80,
                borderBottomWidth: 2,
                borderBottomColor: 'white',
                alignSelf: 'center',
                right: 5,
              }}
            />
          </React.Fragment>
        ) : (
      <React.Fragment>
            <PlayArrow
              name="play-circle-fill"
              color="white"
              size={30}
              onPress={() =>  Alert.alert('something')//setAudioPlaying(true) //playAudio(currentMessage.audio)
              }
            />
            <View
              style={{
                width: 80,
                borderBottomWidth: 2,
                borderBottomColor: 'white',
                alignSelf: 'center',
                right: 5,
              }}
            />
        </React.Fragment>
        )}
      </View>
    );
  };

  const renderMessageVideo = (props: any) => {
    return (
      <React.Fragment>
        <Lightbox renderContent={() => playVideo(props)}>
          <VideoPlayer
            controls={false}
            paused={true}
            resizeMode="contain"
            source={{
              uri: props.currentMessage.video,
            }}
            style={{
              height: 200,
              width: 250,
              top: 10,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <PlayArrow
              name="play-circle-fill"
              size={50}
              color="white"
              style={{
                alignSelf: 'center',
                elevation: 10,
                // justifyContent: 'center',
                /// flex: 1,
                //  /   marginTop: 80,
              }}
            />
          </VideoPlayer>
        </Lightbox>
      </React.Fragment>
    );
  };

  const playVideo = (props: any) => {
    const {currentMessage} = props;

    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <VideoPlayer
          controls={true}
          resizeMode="contain"
          source={{
            uri: currentMessage.video,
          }}
          style={{
            height: 600,
            width: Dimensions.get('window').width,
            alignSelf: 'center',
            //top: 200,
          }}
        />
      </View>
    );
  };

  const renderMessageImage = (props: any) => {
    const {currentMessage} = props;
    return (
      <Lightbox renderContent={() => viewImage(props)}>
        <Image
          source={{uri: currentMessage.image}}
          style={{height: 180, width: 200, resizeMode: 'contain'}}
        />
      </Lightbox>
    );
  };

  const viewImage = (props: any) => {
    return (
      <Image
        source={{uri: props.currentMessage.image}}
        style={{height: 500, width: '100%', resizeMode: 'contain'}}
      />
    );
  };

  const renderSend = (
    props: Readonly<SendProps<IMessage>> &
      Readonly<{children?: React.ReactNode}>,
  ) => {
    return (
      <View>
        {textS != '' ? (
          <Send {...props}>
            <View style={{marginBottom: 5}}>
              <SendIcon name="send-circle" color="purple" size={33} />
            </View>
          </Send>
        ) : (
          <View
            style={{marginBottom: 10}}
            onStartShouldSetResponder={evt => onStartAudioRecording(evt, props)}
            onResponderRelease={evt => onFinshedAudioRecording(evt, props)}>
            {!isRecording ? (
              <MicrophoneIcon
                name="microphone"
                color="purple"
                size={26}
                style={{right: 10}}
              />
            ) : (
              <View
                style={{
                  height: 38,
                  width: 38,
                  backgroundColor: 'red',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  right: 10,
                }}>
                <MicrophoneIcon name="microphone" color="white" size={26} />
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const navigateBack = () => {
    props.navigation.goBack();
    props.reduxToggleRouterBarVisibilityAction(true);
    return true;
  };

  const isTypingAnimation = () => {
    return (
      <View
        style={{
          backgroundColor: '#D3D3D3',
          width: 45,
          height: 25,
          borderRadius: 15,
          flex: 1,
          marginLeft: 5,
          marginBottom: 10,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{marginLeft: 5}}>
          <TypingAnimation
            dotColor="black"
            dotMargin={7}
            dotAmplitude={3}
            dotSpeed={0.8}
            dotRadius={2.5}
            dotX={12}
            dotY={6}
          />
          <Text />
        </View>
      </View>
    );
  };

  //deleteUserMessage
  const messageActions = (props: any, currentMessage: IMessage) => {
    const options =
      currentMessage.user._id === '1'
        ? ['Copy Message', 'Delete Message', 'Cancel']
        : ['Copy Message', 'Cancel'];

    const cancelButtonIndex = options.length - 1;
    const deleteButtonIndex = options.length - 2;

    const actionSheet =
      currentMessage.user._id === '1'
        ? {options, deleteButtonIndex, cancelButtonIndex}
        : {options, cancelButtonIndex};

    props
      .actionSheet()
      .showActionSheetWithOptions(actionSheet, (buttonIndex: any) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(currentMessage.text);
            break;
          case 1:
            deleteUserMessage(currentMessage._id);
        }
      });
  };

  const uploadFooter = () => {
    return (
      <View style={{flexDirection: 'row', bottom: 10}}>
        <Text style={{left: 10, fontSize: 20, fontWeight: 'bold', right: 10}}>
          Sending{'  '}
        </Text>
        <ActivityIndicator size={30} color="#0000ff" />
      </View>
    );
  };

  const emptyChatView = () => {
    return (
      <View
        style={{
          transform: [{scaleY: -1}],
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 25, color: '#404040'}}>Start chatting </Text>
        <ChatIcon
          style={{alignSelf: 'center'}}
          name="wechat"
          color="#404040"
          size={80}
        />
      </View>
    );
  };

  return (
    <React.Fragment>
      <View style={styles(props).chatHeaderContainer}>
        <View style={styles(props).chatHeaderItemsContainer}>
          <BackArrow
            color="black"
            style={styles(props).iconPosition}
            name="arrow-back-ios"
            size={26}
            onPress={() => navigateBack()}
          />
          <View style={styles(props).merchantNameContainer}>
            <Image
              source={{uri: props.chat.hunter.photo}}
              style={styles(props).merchantImageContainer}
            />
            <Text style={[styles(props).messageText, {}]}>
              {props.chat.hunter.name}
            </Text>
          </View>
          <Store
            name="store"
            color="black"
            style={styles(props).iconPosition}
            size={27}
          />
        </View>
        <View style={styles(props).onlineContainer}>
          {props.chat.merchant.online ? (
            <React.Fragment>
              <Text style={styles(props).onlineText}>Online </Text>
              <OnlineIcon height={18} width={18} style={{top: 3}} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={styles(props).onlineText}>Away </Text>
              <OfflineIcon height={18} width={18} style={{top: 3}} />
            </React.Fragment>
          )}
        </View>
      </View>
      <View style={{flex: 1}}>
        <GiftedChat
          onInputTextChanged={(text: string) => setText(text)}
          renderLoading={() => (
            <View
              style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size={'large'} color={'blue'} />
            </View>
          )}
          infiniteScroll
          isTyping={false}
          user={{_id: '2'}}
          messages={messages}
          alwaysShowSend={true}
          onLongPress={(props, currentMessage) => {
            messageActions(props, currentMessage);
          }}
          // renderInputToolbar={(props)=> <InputToolbar {...props} containerStyle={{height:40,alignSelf:'center', width:'80%',borderRadius:25,bottom:5, backgroundColor:'white'}}/>}
          renderMessageImage={props => renderMessageImage(props)}
          renderSend={props => renderSend(props)}
          onSend={messages => handleSend(messages)}
          renderFooter={() =>
            typing
              ? isTypingAnimation()
              : isRecording
              ? audioTimer()
              : upload
              ? uploadFooter()
              : null
          }
          renderTicks={(message: IMessage) => {
            if (message.pending) {
              return (
                <View>
                  <Pending
                    name="clock-time-nine"
                    color="white"
                    style={{right: 3}}
                    size={12}
                  />
                </View>
              );
            }
          }}
          renderChatEmpty={() => emptyChatView()}
          renderMessageAudio={(props: any) => renderMessageAudio(props)}
          renderMessageVideo={(props: any) => renderMessageVideo(props)}
          renderActions={props => (
            <Actions
              {...props}
              options={{
                ['Send Image']: () => sendImagesInChat(props),
                ['Send Video']: () => sendVideoInChat(props),
                ['Open Camera']: () => useCamera(props),
              }}
              icon={() => (
                <Camera
                  style={{bottom: 8}}
                  name="camera"
                  size={30}
                  color="purple"
                />
              )}
            />
          )}
        />
      </View>
    </React.Fragment>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? LightTheme.backgroundColor
          : DEFAULT,
      justifyContent: 'center',
    },
    merchantImageContainer: {
      height: 30,
      top: 10,
      width: 30,
      right: 7,
      borderRadius: 200,
      resizeMode: 'cover',
    },
    iconPosition: {
      top: 28,
    },
    merchantNameContainer: {
      flexDirection: 'row',
      marginTop: 15,
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      height: hp(40),
      width: wp(80),
      elevation: 15,
      zIndex: 100,
      alignSelf: 'center',
      borderRadius: 25,
    },
    onlineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      bottom: 32,
      left: 20,
    },
    onlineText: {
      alignSelf: 'center',
    },
    chatHeaderContainer: {
      height: '7%',
      // position: 'absolute',
      backgroundColor: 'white',
      borderBottomWidth: 0.2,
      borderBottomColor: 'grey',
    },
    chatHeaderItemsContainer: {
      bottom: 21,
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-between',
      width: '100%',
    },
    messageText: {
      marginTop: '5%',
      alignSelf: 'center',
      fontSize: 20,
      color:
        props.theme === DARK
          ? DarkTheme.settingsText
          : props.theme === LIGHT
          ? LightTheme.settingsText
          : DEFAULT,
    },
    toggleThemeText: {
      fontSize: 20,
      color:
        props.theme === DARK
          ? DarkTheme.toggleAppText
          : props.theme === LIGHT
          ? LightTheme.toggleAppText
          : DEFAULT,
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    chat: state.chat.chat,
    user: state.user.user,
    network: state.network,
    theme: state.theme.theme,
    accountType: state.dashboardAccountType.accountType,
    chatData: state.messages.messages,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<SetThemeActionStore | ShowBarActionType>,
) => {
  return {
    reduxSetUIThemeAction: (theme: string) => dispatch(SetUIThemeAction(theme)),
    reduxToggleRouterBarVisibilityAction: (visibility: boolean) =>
      dispatch(ToggleRouterBarVisibilityAction(visibility)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MerchantMessageScreen);
