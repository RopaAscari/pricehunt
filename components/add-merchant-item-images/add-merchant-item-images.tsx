import React from 'react';
import {connect} from 'react-redux';
import ApiService from '@services/api-service';
import {Modal, Portal, Provider} from 'react-native-paper';
import DeleteIcon from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import {
  Text,
  Keyboard,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import Svg,{ Path,G, Defs } from 'react-native-svg'
import {ScrollView} from 'react-native-gesture-handler';
import AddIcon from '@icons/add-item-icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DeleteImageIcon from '@icons/delete-image-icon'
import {NavigationScreenProp} from 'react-navigation';
import {SetItemActionType, SetItemStepStore} from '@constants/item-types';
import {SetItemAction} from '@actions/set-item-action';
import {Dispatch} from 'redux';
import {RootState} from '@reducers/combined-reducers';
import {SetItemStepAction} from '@actions/set-add-item-progress';

type Props = {
  item: any;
  step: any;
  user: any
  userInfo: any;
  imageUrl: string;
  accountStatus: any;
  reduxStepItemAction: (item: any) => void;
  reduxSearchItemAction: (item: any) => void;
  navigation: NavigationScreenProp<any, any>;
};

type State = {
  ID: string; 
  url: string;
  test: string;
  name: string;
  type: string;
  photo: string;
  image: string;
  loading: true;
  test1: string;
  merch: string;
  images: string; 
  imageObj: any;
  fadeValue: any;
  check: boolean;
  thumb: boolean;
  profile: string;
  adding: boolean; 
  springValue: any; 
  merchant: string;
  selected: number;
  item: Array<any>; 
  thumbnail: string;
  removing: boolean;
  tester: Array<any>;
  shakeAnimation: any;  
  photoString: string;
  description: string; 
  encodedBase64: string;
  modalVisible: boolean;
  thumbnailImage: string;   
  removeSelected: any;
  imageStored: Array<any>;
  componentMounted: boolean; 
  price: number | undefined;
  currentSelectedImage: any;
};

class AddMerchantImages extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ID: '',
      image: '',
      photo: '',
      name: '',
      type: '',
      price: 0, 
      item: [],
      test: '',
      test1: '',
      merch: '',
      images: '',
      thumbnail: '',
      profile: '',
      url: '',
      loading: true,
      check: false,
      thumb: false,
      selected: 0,
      merchant: '',
      imageObj: {},
      adding: false,
      imageStored: [],
      removing: false,
      description: '',
      photoString: '',
      encodedBase64: '',
      removeSelected: null, 
      thumbnailImage: '',
      modalVisible: false,
      componentMounted: false,    
      currentSelectedImage: '',
      fadeValue: new Animated.Value(0),
      springValue: new Animated.Value(0.47),
      shakeAnimation: new Animated.Value(0),
      tester: ['testing1', 'testing2', 'testing3', 'testing4', 'testing5'],
      
    };
  }

  componentDidMount() {
    this.setState({componentMounted: true})
  }

  format = (amount: any) => {
    return parseInt(
      Number(amount)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,'),
    );
  };

  addItem = () => {

    const Item = {
      id: this.props.item._id,
      name: this.props.item.name,
      thumbnailImage: this.state.currentSelectedImage,
      price: this.props.item.price,
      type: this.props.item.type,
      merchantId: this.props.user._id,
      //imageUrl: this.state.currentSelectedImage,
      merchantName: this.props.item.merchantName,
      comments: this.props.item.comments,
      description: this.props.item.descritpion,
      popularLabel: this.props.item.popularLabel,
      images: this.state.imageStored,
      containerType: this.props.item.containerType,
    };

    this.props.reduxSearchItemAction(Item);
    this.props.navigation.navigate('Confirm-Add');
    this.props.reduxStepItemAction(this.props.step + 1);
  }; 
  

  chooseThumbnailImage = async () => {
    const options = {};
    ImagePicker.launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.uri) {
        const image = {
          name: response.fileName,
          uri: response.uri,
          base64: response.data,
          type: 'image/jpeg',
        };

        this.setState({currentSelectedImage: image});
        this.setState({imageStored: [...this.state.imageStored, ...[image]]});
      }
    });
  };

  startShake = () => {
    // A loop is needed for continuous animation
    Animated.loop(
      // Animation consists of a sequence of steps
      Animated.sequence([
        // start rotation in one direction (only half the time is needed)
        Animated.timing(this.state.shakeAnimation, {
          toValue: 1.0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // rotate in other direction, to minimum value (= twice the duration of above)
        Animated.timing(this.state.shakeAnimation, {
          toValue: -1.0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // return to begin position
        Animated.timing(this.state.shakeAnimation, {
          toValue: 0.0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  onChangeText = (key: string, value: any) => {
    this.setState({[key]: value} as Pick<State, keyof State>);
  };

  setModalVisible = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  setThumbnail = (i: any, k: any) => {
    this.setState({selected: k});
    this.setState({thumbnail: i});
  };

  selectCurrentImage = (payload: any, index: number) => {
    this.setState({selected: index});
    this.setState({currentSelectedImage: payload});
  };

  removeImage = (index: number) => {
    this.startShake();
    this.setState({componentMounted: false})
    this.setState({removeSelected: index});
  };

  deleteMiniImage = (i: any, k: any) => {

    let index
    let length = this.state.imageStored.length
    const removed = this.state.imageStored.filter(image => image !== i);

    if(this.state.currentSelectedImage === i){
      
    (k + 1 < length) ?  index = k + 1: index = k - 1
    
      this.setState({currentSelectedImage: this.state.imageStored[index]})
    }
      
    this.setState({
        imageStored: removed
      });

  }

  cancelRemove = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  Images = () => {
    if (this.state.imageStored.length > 0) {
      return this.state.imageStored.map((i, k) => {
        //console.log('K',k)
        return (
          <>
            <View key={k} style={{padding: 10, alignSelf: 'center'}}>
              <View style={styles.rectangle}>
                {k === this.state.removeSelected && !this.state.componentMounted ? (
                  <DeleteIcon
                    size={25}
                    name="x"
                    style={{
                      marginTop: 22,
                      marginLeft: 33,
                      zIndex: 5,
                      position: 'absolute',
                      opacity: 0.5,
                    }}
                    color="red"
                    onPress={() => {                    
                      this.deleteMiniImage(i, k)
                    }}
                  />
                ) : null}

                <TouchableOpacity
                  onLongPress={() => this.removeImage(k)}
                  onPress={() => {
                    this.selectCurrentImage(i, k);
                  }}>
                  <Animated.Image
                    source={{uri: `data:image/jpeg;base64,${i.base64}`}}
                    style={
                      k === this.state.removeSelected && !this.state.componentMounted ?
                         [
                            styles.selected,
                            {
                              transform: [
                                {
                                  rotate: this.state.shakeAnimation.interpolate(
                                    {
                                      inputRange: [-1, 1],
                                      outputRange: ['-0.1rad', '0.1rad'],
                                    },
                                  ),
                                },
                              ],
                            },
                          ]
                        : styles.smallerImage
                    }
                  />
                  { k === this.state.selected?
                  <View style={[{height:2, width: 80, backgroundColor:'#ED4E4E'}]}/>:null}
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      });
    } else {
      return null;
    }
  };

  previousStep = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('Add-Description');
    this.props.reduxStepItemAction(this.props.step - 1);
  };

  render() {
    return (
      <ScrollView >
        <View /*onTouchStart={() => this.setState({ removeSelected: null})} */style={styles.body}>

        <Icon
            name="arrow-back-ios"
            color={'grey'}
            size={27}
            style={{left: 20}}
            onPress={() => this.previousStep()}
          />
          <Text style={styles.imageName}>{'Add Item Images '}</Text>

          <View style={{alignItems: 'center'}}>
            <View style={styles.rectangle2}>
              {this.state.currentSelectedImage != null ? (
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${
                      this.state.currentSelectedImage.base64
                    }`,
                  }}
                  style={{
                    width: 260,
                    height: 260,
                    top: 25,
                    resizeMode: 'contain',
                  }}
                />
              ) : (
                <Icon name="image" size={160} style={{top: 60}} color="grey" />
              )}
            </View>
          </View>

          { this.state.imageStored.length === 100000? 
            <View style={{alignItems: 'flex-end', top: 40, right: 20}}>
              <TouchableWithoutFeedback onPress={()=> this.setState({ thumbnail: this.state.currentSelectedImage })}>   
                  <Text  style={{color: '#ED4E4E',fontSize: 15}}> Set as Thumbnail</Text> 
              </TouchableWithoutFeedback> 
            </View>: null
          }

          <Text>{'\n'}</Text>

          <View style={{marginLeft: 30}}>
            <Text style={{color: '#ED4E4E', fontSize: 20}}>Upload Images</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 10, height: 150, width: 360}}>
              <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200} //your element width
                snapToAlignment={"center"}
                pagingEnabled={true}
                style={{height: 100, width: 360, marginLeft: 30}}
                showsHorizontalScrollIndicator={true}>
                {this.Images()}
              </ScrollView>
            </View>

            <View style={styles.add}>
              <View style={{top: 20}}>
                <TouchableOpacity onPress={this.chooseThumbnailImage}>
                  <AddIcon height={35} width={35} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <View style={{marginLeft: 20}}>
              <Text>{'\n'}</Text>

              <TouchableOpacity
                disabled={this.state.imageStored.length === 0? true: false}
                style={[this.state.imageStored.length === 0? styles.nextButtonDisabled: styles.nextButton]}
                onPress={() => this.addItem()}>
                <Text style={styles.nextText}>Select Images</Text>
              </TouchableOpacity>

              {this.state.adding ? (
                <ActivityIndicator size={50} color="#0000ff" />
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    //   flex: 1,
    // alignItems:'center',
    //justifyContent:'center',
  },
  imageName: {
    fontSize: 25,
    alignSelf:'center',
    textAlign: 'center' ,
    color: '#ED4E4E',
    fontFamily: 'Roboto',
    //fontWeight: 'bold'
  },
  nextButton: {
    width: wp(60),
    height: hp(5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginBottom: hp(1),
    backgroundColor: '#F71735',
  },
  nextButtonDisabled: {
    width: wp(60),
    height: hp(5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginBottom: hp(1),
    opacity: 0.8,
    backgroundColor: 'grey',
  },
  nextText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Roboto',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: 600,
    width: 350,

    alignItems: 'center',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  TextInput: {
    backgroundColor: 'white',
    width: 220,
    height: 40,
    bottom: 15,
    top: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  Description: {
    backgroundColor: 'white',
    width: 220,
    height: 80,
    bottom: 15,
    top: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  rectangle2: {
    top: 20,
    alignItems: 'center',
    width: 400,
    height: 300,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 17,
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
  },
  rectangle: {
    bottom: 20,
    alignItems: 'center',
    width: 80,
    height: 80,
    //borderWidth:1,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 17,
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
  },
  add: {
    left:50,
    marginTop: 30,
    // position: 'absolute',
   // alignItems: 'flex-end',
    //borderColor:'black',
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
  },
  smallerImage: {
    width: 80,
    height: 80,
    zIndex: 100,
    //elevation: 5,
    resizeMode: 'contain',
  },
  selected: {
    width: 80,
    height: 80,
    opacity: 0.5,
    // borderWidth: 2,
    // borderColor: 'red',
    // borderBottomColor: 'red',
    // borderBottomWidth: 2,
    resizeMode: 'contain',
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    step: state.step.step,
    item: state.item.item,
    user: state.user.user,
    theme: state.theme.theme,
    session: state.session.isloggenIn,
    isNetworkConnected: state.network.isNetworkConnected,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<SetItemActionType | SetItemStepStore>,
) => {
  return {
    reduxStepItemAction: (step: number) => dispatch(SetItemStepAction(step)),
    reduxSearchItemAction: (item: any) => dispatch(SetItemAction(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMerchantImages);
