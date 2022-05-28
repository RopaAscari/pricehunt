import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import RNFS from 'react-native-fs';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Image
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PESDK, PhotoEditorModal, Configuration} from 'react-native-photoeditorsdk';

import {NavigationScreenProp} from 'react-navigation';
import SideMenu from 'react-native-side-menu-updated'
import {RootState} from '@reducers/combined-reducers';
import { UploadImages } from '@services/image-service';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import IconService from '@services/icon-selector-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stories from '@components/render-stories/screens/Stories';
import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

import Notifications from './Notifications';
import { SetNotificationsAction } from '@actions/set-notification-action';
import { SetNotificationActionType } from '@constants/notification-types';
import { manageUserOnlinePresence } from 'firebase/functions/user-presence';
//import PhotoEditor from '../../native-modules/react-native-photo-editor'



type Props = {
  user: any;
  notifications: any
  navigation: NavigationScreenProp<any, any>;
  reduxSetNotifcationsAction: (notifications: Array<any>) => void;
};

type State = {
  visits: number;
  isOpen: boolean
  selectedItem:string
  tempStoryItem: any;
  openModal: boolean;
  storeItems: number;
  sendStory: boolean;
  subscribers: number;
  uploadingStory: boolean;
  currentMerchantStories: any
  openNotificationMenu: boolean;
  recievedNotifications: boolean;
  notificationData: string
};

const { height, width } = Dimensions.get('window')

class MerchantDasboardScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visits: 0,
      isOpen: false,
      storeItems: 0,
      subscribers: 0,
      sendStory: false,
      openModal: false,  
      tempStoryItem: {},
      notificationData:'',
      selectedItem: 'About',
      uploadingStory: false,
      currentMerchantStories: {},
      openNotificationMenu: false,
      recievedNotifications: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {

    this.getExistingStories()
    manageUserOnlinePresence(this.props.user._id)
    //Alert.alert(JSON.stringify(this.props.user))
    const subScriptionsListener = firestore()
      .collection('SUBSCRIPTIONS')
      .doc(this.props.user._id)
      .collection('USERS')
      .onSnapshot(querySnapShot => {
        const subscriptions = querySnapShot.docs.length;
        this.setState({subscribers: subscriptions});
      //  this.setState({ recievedNotifications: true});
 
        const notification = {
          data: 'A hunter just subscribed your store',
          type: 'subscribe',
          date: new Date().getTime(),
        };

        this.props.notifications.push(notification);
        this.props.reduxSetNotifcationsAction(this.props.notifications);
      //  this.setState({ notificationData:'A hunter just subscribed your store'})
      //  this.subscriberNotification();
      });

    const storeVisitListener = firestore()
      .collection('VIEWS')
      .doc(this.props.user._id)
      .onSnapshot(querySnapShot => {
        const views = querySnapShot.data();

        if (views !== undefined) {
        //  this.visitNotification();
          this.setState({visits: views.views});
          console.log('render views')

          const notification = {
            data: 'A hunter just view your store',
            type: 'views',
            date: new Date().getTime(),
          };
  
          this.props.notifications.push(notification);
          this.props.reduxSetNotifcationsAction(this.props.notifications);
        }
      });

    return () => {
      storeVisitListener(), subScriptionsListener();
    };
  }

  visitNotification = () => {
    showMessage({
      message: 'A hunter just visited your store',
      icon: 'success',
    });
  };

  subscriberNotification = () => {
    showMessage({
      message: 'A hunter just subscribed your store',
      icon: 'success',
    });
  };

  validateSubscriptions = async() => {
    const subscribers = await firestore()
      .collection('SUBSCRIPTIONS')
      .doc(this.props.user._id).get()

      if(!subscribers.exists){

      }
  }

  getExistingStories = async () => {
    const merchantStories = await firestore().collection('STORIES').doc(this.props.user._id).get();

    if(merchantStories.exists){
         merchantStories.data()?.stories.length > 0? this.setState({ currentMerchantStories:  merchantStories.data()}) : null  
    }
  }

  appendStory = async(currentStory: any) => {
    const story = await firestore().collection('STORIES').doc(this.props.user._id).get()
    let currentStoryInstance = story.data()

    currentStoryInstance?.stories.push(currentStory)

    firestore().collection('STORIES').doc(this.props.user._id).update({
      stories: currentStoryInstance?.stories
    }).then(async() => {
      await this.getExistingStories();
    })
    .catch((err) => {
      if(err){
        console.log(err)
      }
    })
  }

  validateStoryInstance = async(storyObj: any, currentStory: any) => {

    const storyRef = firestore().collection('STORIES').doc(this.props.user._id);
    const doc = await storyRef.get();

    if (!doc.exists) {
      firestore().collection('STORIES').doc(this.props.user._id).set(storyObj).then(async() => {
        await this.appendStory(currentStory);
      })
      .catch((err) => {
        if(err){
          console.log(err)
        }
      })
    }else{
        await this.appendStory(currentStory).catch((err) => {
          if(err){
            console.log(err);
          }
      });
    }
  }

  uploadStory = async(image: any) => {

    //this.closeModal()

    const storyObj =  {
      id: this.props.user._id,
      username: this.props.user.companyName,
      title: this.props.user.companyName,
      profile: this.props.user.logo,
      stories: [],
      allStoriesWatched: false,
    }
    
    const res = await UploadImages(image);
    const url = (await res.promise()).Location;

    let story = {
      id: this.generateStoryId(),
      type: 'image',
      duration: 2,
      isReadMore: true, 
      url:url,
      users:[],
      date: new Date().getTime()
    }  
    this.validateStoryInstance(storyObj, story)
  }

  getImageFromLibrary = async() => {

    const options: ImagePickerOptions = {
      title: 'Image Picker',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(
      options,
      async (response: ImagePickerResponse) => {
        if(!response.didCancel && response){

          //const res = await this.testEditor(response.path)

          this.openImageEditor(response.path)

         // this.setState({ tempStoryItem: image })
          
         // this.openModal()
        }
    })
  }

  closeModal = () => {
    this.setState({openModal: false})
  }

  openModal = () => {
    this.setState({openModal: true})
  }

  openNotificationMenu = () => {
      this.setState({openNotificationMenu: true})
  }

  renderMerchantCards = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => item.navigation()}
        style={{
          flex: 1,
          margin: 5,
          borderRadius: 15,
          backgroundColor: '#ddd',
          height: 180,
          width: 70,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  renderNotifications = () => {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Notifcations Loading...</Text>
      </View>
    )
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

    deleteStoryCallback = () => {
      console.log('deleted')
      this.getExistingStories()
    }
  

    generateStoryId = () => {
    
      let S4 = () => {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
  
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
  

    openImageEditor = (imagePath: any) =>{

      const onDone = async(response: any) => {
        try{
          const buffer = await RNFS.readFile(response, 'base64');  

          const filename = response.substring(
            response.lastIndexOf('/') + 1,
            response.length,
          );

          const image = {
            name: filename,
            base64: buffer,
            type: 'image/jpeg',
          };

          this.uploadStory(image)
          //console.log('DONE',buffer);
        }catch(error){
          console.error(error);
        }
      }

     // PhotoEditor.Edit({ path: imagePath, onDone })
    }

    /*testEditor = async(loc: any) => {
     return await PESDK.openEditor({uri: loc}).then((res) =>{
       return res
      })*/

  render() {
    const menu = <Notifications notificationData={this.state.notificationData} closeNotifications={this.toggle} />;

    const merchant = 'merchant';

    const items = [
      {
        title: 'Product List',
        navigation: () => this.props.navigation.navigate('Product-List'),
      },
      {
        title: 'Add New',
        navigation: () => this.props.navigation.navigate('Add-Merchant-Item'),
      },
      {
        title: 'Payments',
        navigation: () => this.props.navigation.navigate('Merchant-Chat'),
      },
      {
        title: 'Account',
        navigation: () => this.props.navigation.navigate('Account'),
      },
      {
        title: 'Edit Store',
        navigation: ()=> this.props.navigation.navigate(''),
      },
      {
        title: 'Messages',
        navigation: () => this.props.navigation.navigate('Merchant-Chat'),
      },
    ];
    return (
      <React.Fragment>
          <SideMenu 
          openMenuOffset={width}
          bounceBackOnOverdraw={false} 
          menuPosition={'right'} isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}  menu={menu}>
            <ScrollView
          contentContainerStyle={{height: Dimensions.get('window').height}}>
          <View style={styles(this.props).body}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between',marginTop:10}}>
           { Object.keys(this.state.currentMerchantStories).length === 0 && this.state.currentMerchantStories.constructor === Object ?  
           <Image
           style={{ width: 66,
            margin: 4,
            height: 66,
            borderRadius: 33,
            //borderWidth: 2,
           // borderColor: '#72bec5',
          }}
           source={{ uri: this.props.user.logo }}
          // isHorizontal
         />
   
           :<Stories delete={this.deleteStoryCallback} stories={[this.state.currentMerchantStories]} viewer={merchant}/>
            }
            <View style={{flexDirection: 'row'}}>
              {IconService.fontAwesomeIcons(
                'bell',
                hp(3),
                {marginTop: '5%',elevation:10, marginRight: 15},
                'white',
                this.toggle
              )} 
              { //this.state.recievedNotifications?
              <View style={{height:10, width:10,borderRadius: 30, backgroundColor:'#FFD03F', elevation:10, position:'absolute',top:5,left:hp(2)}}/>
              //: null
              }
              </View>
            </View>
            <Text style={styles(this.props).merchantHeader}>
              {this.props.user.companyName}
            </Text>
            <Text style={styles(this.props).dashboardText}>Dashboard</Text>
          </View>

          <View style={styles(this.props).contentBody}>
            <View style={styles(this.props).cardRow}>
              <View style={styles(this.props).cardContainer}>
                <Text style={styles(this.props).cardAmountText}>
                  {this.state.subscribers}
                </Text>
                <View style={styles(this.props).cardInnerMargin}>
                  {IconService.Iconicons('people', hp(2.7), {}, '#1A8FE3')}
                  <Text style={styles(this.props).cardTitle}>Followers</Text>
                </View>
              </View>

              <View style={styles(this.props).cardContainer}>
                <Text style={styles(this.props).cardAmountText}>0</Text>
                <View style={styles(this.props).cardInnerMargin}>
                  {IconService.materialIcons('mouse', hp(2.5), {}, '#F04F4F')}
                  <Text style={styles(this.props).cardTitle}>Clicks</Text>
                </View>
              </View>

              <View style={styles(this.props).cardContainer}>
                <Text style={styles(this.props).cardAmountText}>
                  {this.state.visits}
                </Text>
                <View style={styles(this.props).cardInnerMargin}>
                  {IconService.antDesignIcons('eye', hp(2.7), {}, '#F2C94C')}
                  <Text  onPress={() =>  this.props.reduxSetNotifcationsAction([])} style={styles(this.props).cardTitle}>Impressions</Text>
                </View>
              </View>
            </View>

        <TouchableOpacity onPress={this.getImageFromLibrary}>
         <View style={[styles(this.props).row, {alignSelf:'center'}]}>
            <Text style={{fontSize: 15}}>Add Story  </Text>
            {IconService.Iconicons('ios-add-circle-sharp', hp(2.7), {bottom: 5}, '#1A8FE3')}
         </View>
        </TouchableOpacity>







            <FlatList
              style={{margin: 5}}
              data={items}
              numColumns={2}
              renderItem={this.renderMerchantCards}
            />
          </View>
        </ScrollView>
          </SideMenu>
        {/*<ScrollView
          contentContainerStyle={{height: Dimensions.get('window').height}}>
          <View style={styles(this.props).body}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
           { Object.keys(this.state.currentMerchantStories).length === 0 && this.state.currentMerchantStories.constructor === Object ?  
           <Ionicons name={'people-circle'} size={hp(4)} color={ 'white'} style={{ marginTop: '5%', marginLeft: 15}} onPress={()=>this.getImageFromLibrary()} />
           :<Stories stories={[this.state.currentMerchantStories]} viewer={merchant}/>
  
}
              {IconService.fontAwesomeIcons(
                'bell',
                hp(3),
                {marginTop: '5%', marginRight: 15},
                'white',
                this.toggle
              )}
            </View>
            <Text style={styles(this.props).merchantHeader}>
              {this.props.user.companyName}
            </Text>
            <Text style={styles(this.props).dashboardText}>Dashboard</Text>
          </View>

          <View style={styles(this.props).contentBody}>
            <View style={styles(this.props).cardRow}>
              <View style={styles(this.props).cardContainer}>
                <Text style={styles(this.props).cardAmountText}>
                  {this.state.subscribers}
                </Text>
                <View style={styles(this.props).cardInnerMargin}>
                  {IconService.Iconicons('people', hp(2.7), {}, '#1A8FE3')}
                  <Text style={styles(this.props).cardTitle}>Followers</Text>
                </View>
              </View>

              <View style={styles(this.props).cardContainer}>
                <Text style={styles(this.props).cardAmountText}>0</Text>
                <View style={styles(this.props).cardInnerMargin}>
                  {IconService.materialIcons('mouse', hp(2.5), {}, '#F04F4F')}
                  <Text style={styles(this.props).cardTitle}>Clicks</Text>
                </View>
              </View>

              <View style={styles(this.props).cardContainer}>
                <Text style={styles(this.props).cardAmountText}>
                  {this.state.visits}
                </Text>
                <View style={styles(this.props).cardInnerMargin}>
                  {IconService.antDesignIcons('eye', hp(2.7), {}, '#F2C94C')}
                  <Text style={styles(this.props).cardTitle}>Impressions</Text>
                </View>
              </View>
            </View>

        <TouchableOpacity onPress={()=> this.getImageFromLibrary()}>
         <View style={[styles(this.props).row, {alignSelf:'center'}]}>
            <Text style={{fontSize: 15}}>Add Story  </Text>
            {IconService.Iconicons('ios-add-circle-sharp', hp(2.7), {bottom: 5}, '#1A8FE3')}
         </View>
        </TouchableOpacity>

            <FlatList
              style={{margin: 5}}
              data={items}
              numColumns={2}
              renderItem={this.renderMerchantCards}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.openModal}
            style={styles(this.props).modal}
            onShow={() => {}}>
             <ImageBackground resizeMode="cover" source={{uri: `data:image/jpeg;base64,${
                      this.state.tempStoryItem.base64 !==''? this.state.tempStoryItem.base64 :''
                    }`}} style={styles(this.props).sendStoryImageBackground}>
                  {IconService.Fontisto('close-a', hp(2),{padding: 20},'white', this.closeModal)}
                <TouchableOpacity style={styles(this.props).sendStory} onPress={()=> this.uploadStory()}>
                  <View style={styles(this.props).row}>
                    <Text style={styles(this.props).sendStoryText}>Send  </Text>
                    {IconService.Iconicons('send', hp(2), {}, 'white')}
                  </View>
                </TouchableOpacity>
             </ImageBackground>
            
            </Modal>
        </ScrollView>*/}
      </React.Fragment>
    );
  }
}

const styles = (props: Props) =>
  StyleSheet.create({
    modal: {
      flex: 1,
    },
    body: {
      height: '30%',
      backgroundColor: '#FF4C52',
    },
    row:{
      flexDirection: 'row'
    },
    merchantHeader: {
      fontSize: 32,
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Roboto-Bold',
    },
    cardInnerMargin: {
      marginLeft: 10,
    },
    cardTitle: {
      marginTop: 5,
      fontSize: 20,
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    cardAmountText: {
      padding: 20,
      textAlign: 'center',
      fontSize: 22,
    },
    cardContainer: {
      height: 145,
      bottom: '10%',
      width: 145,
      backgroundColor: 'white',
      borderRadius: 20,
      elevation: 7,
      /// borderColor: 'grey', // if you need
      // borderWidth: 1,
      overflow: 'hidden',
      shadowColor: 'grey',
      shadowRadius: 10,
      shadowOpacity: 1,
    },
    dashboardText: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Roboto-Regular',
    },
    contentBody: {
      //flex: 1,
      //marginTop: 300,
      top: '25%',
      height: '100%',
      width: '100%',
      elevation: 10,
      position: 'absolute',
      backgroundColor: 'white',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    sendStory: {
      height:50, 
     
      right: 20,  
      width: 100,
      borderRadius:20, 
      alignItems:'center', 
      position: 'absolute',
      
      backgroundColor:'black', 
      
      justifyContent:'center', 
      alignSelf:'flex-end',
      
      top: height - 150, 
    },
    sendStoryText: {
      fontSize: 17, 
      color:'white', 
      fontWeight:'bold'
    },
    sendStoryImageBackground: {
      height: height, 
      width: width
    }
  });

const mapStateToProps = (state: RootState) => {
  return {
    step: state.step.step,
    item: state.item.item,
    user: state.user.user,
    theme: state.theme.theme,
    session: state.session.isloggenIn,
    isNetworkConnected: state.network,
    notifications: state.notifications.notifications,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SetNotificationActionType>) => {
  return {
    reduxSetNotifcationsAction: (item: any) =>
      dispatch(SetNotificationsAction(item)),
  };
    // reduxSetItemAction: (item: any) => dispatch(SetItemAction(item)),
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MerchantDasboardScreen);
