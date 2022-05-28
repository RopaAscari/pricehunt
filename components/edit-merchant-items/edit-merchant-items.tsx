import React from 'react';
import {connect} from 'react-redux';
import ApiService from '@services/api-service';
import {Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Edit from 'react-native-vector-icons/AntDesign';
import DeleteIcon from 'react-native-vector-icons/Octicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import AddIcon from '@icons/add-item-icon';
import {SetItemActionType} from '@constants/item-types';
import {SetItemAction} from '@actions/set-item-action';
import {Dispatch} from 'redux';
import {RootState} from '@reducers/combined-reducers';
import DropDownPicker from 'react-native-dropdown-picker';
import MerchantBackArrowIcon from '@components/svg/icons/merchant-back-arrow';
import Input from '@components/input/input';
import DeleteImageIcon from '@components/svg/icons/delete-image-icon';

type Props = {
  user: any;
  item: any;
  userInfo: any;
  accountStatus: any;
  imageUrl: string;
};

type State = {
  encodedBase64: string;
  //  multipleEncodedBase64:'',
  photo: string;
  image: string;
  description: string;
  modalVisible: boolean;
  name: string;
  type: string;
  price: number | undefined;
  ID: string;
  photoString: string;
  thumbnailImage: string;
  imageStored: Array<any>;
  item: Array<any>;
  test: string;
  test1: string;
  merch: string;
  images: string;
  url: string;
  loading: true;
  removing: boolean;
  tester: Array<any>;
  thumbnail: string;
  profile: string;
  removeSelected: any;
  shakeAnimation: any;
  currentSelectedImage: string;
  check: boolean;
  thumb: boolean;
  selected: number;
  merchant: string;
  imageObj: any;
};

class EditMerchantItems extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      encodedBase64: '',
      removeSelected: 0,
      //  multipleEncodedBase64:'',
      photo: '',
      removing: false,
      image: '',
      description: '',
      modalVisible: false,
      name: '',
      type: '',
      price: 0,
      ID: '',
      shakeAnimation: new Animated.Value(0),
      currentSelectedImage: '',
      photoString: '',
      thumbnailImage: '',
      imageStored: [],
      item: [],
      test: '',
      test1: '',
      merch: '',
      images: '',
      thumbnail: '',
      profile: '',
      url: '',
      loading: true,
      tester: ['testing1', 'testing2', 'testing3', 'testing4', 'testing5'],
      check: false,
      thumb: false,
      selected: 0,
      merchant: '',
      imageObj: {},
    };
  }

  componentDidMount() {
    console.log(this.props.item.thumbnailImage);
  }

  format = (amount: any) => {
    return parseInt(
      Number(amount)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,'),
    );
  };

  addItem = () => {
    let price = this.format(this.state.price);
    let Item = {
      name: this.state.name,
      type: this.state.type,
      price: price,
      merchantId: this.props.userInfo._id,
      thumbnailImage: this.state.thumbnail,
      images: this.state.imageStored,
      description: this.state.description,
      merchantName: this.props.userInfo.companyName,
    };

    ApiService.AddItem(Item, this.props.accountStatus.auth.token)
      .then(res => res.data)
      .then(res => {
        if (res) {
          console.log(res);
          Alert.alert('Item Added');
        }
      });
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

        this.setState({currentSelectedImage: image.base64});
        this.setState({imageStored: [...this.state.imageStored, ...[image]]});
      }
    });
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

  removeImage = () => {
    //this.setState({ removing: true })
    this.setModalVisible();
  };

  deleteMiniImage = (index: any) => {
    console.log('OLD LENGTH', this.state.imageStored.length);

    const removed = this.state.imageStored.splice(index, 1);

    if (index > -1) {
      this.setState({
        imageStored: removed,
      });
    }

    console.log('NEW LENGTH', this.state.imageStored.length);
  };

  cancelRemove = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  Images = () => {
    if (this.props.item.images.length > 0) {
      return this.props.item.images.map((i: any, k: number) => {
        //console.log('K',k)
        return (
          <>
            <View key={k} style={{padding: 10, alignSelf: 'center'}}>
              <View style={styles.rectangle}>
                <View style={{width: 80}}>
                  <DeleteImageIcon
                    style={{
                      position: 'absolute',
                      elevation: 10,
                      alignSelf: 'flex-end',
                    }}
                    height={20}
                    width={20}
                  />
                </View>

                <TouchableOpacity
                  onLongPress={() => this.removeImage()}
                  onPress={() => {
                    this.selectCurrentImage(i, k);
                  }}>
                  {this.props.item.images.length > 0 ? (
                    <Animated.Image
                      source={{uri: i}}
                      style={
                        k === this.state.removeSelected
                          ? [
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
                  ) : (
                    <Animated.Image
                      source={{uri: `data:image/jpeg;base64,${i.base64}`}}
                      style={
                        k === this.state.removeSelected
                          ? [
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
                  )}
                  {k === this.state.selected ? (
                    <View
                      style={[
                        {height: 2, width: 80, backgroundColor: '#ED4E4E'},
                      ]}
                    />
                  ) : null}
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

  render() {
    return (
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.body}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <MerchantBackArrowIcon height={7} width={7} />
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                marginTop: 20,
                fontWeight: 'bold',
              }}>
              {' '}
              Edit Product
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.rectangle2}>
              {this.state.currentSelectedImage ? (
                <View
                  style={{
                    width: 400,
                    height: 400,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: '#D9D8D8',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{
                      uri:  this.state.currentSelectedImage,
                    }}
                    style={{
                      width: 260,
                      height: 260,
                      top: 25,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              ) : this.props.item.thumbnailImage ? (
                <View
                  style={{
                    width: 400,
                    height: 400,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: '#D9D8D8',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: this.props.item.thumbnailImage}}
                    style={{
                      width: 260,
                      height: 260,
                      top: 25,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              ) : (
                <Icon name="image" size={160} style={{top: 60}} color="grey" />
              )}
            </View>
          </View>
          <Text>{'\n\n'}</Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 60, height: 150, width: 350}}>
              <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200} //your element width
                snapToAlignment={'center'}
                pagingEnabled={true}
                contentContainerStyle={{paddingRight: 100}}
                style={[styles.carousel, {height: 100}]}
                showsHorizontalScrollIndicator={true}>
                {this.Images()}
              </ScrollView>
            </View>

            <View style={styles.add}>
              <View style={{marginTop: 80, left: 20}}>
                <TouchableOpacity onPress={this.chooseThumbnailImage}>
                  <AddIcon height={40} width={40} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text
            style={{
              marginLeft: 30,
              color: '#404040',
              fontFamily: 'Roboto-Regular',
              fontSize: 18,
              marginTop: 10,
            }}>
            Product Name:
          </Text>
          <TextInput
            value={this.props.item.name}
            theme={{roundness: 10}}
            style={{width: 400, marginLeft: 30, marginTop: 5}}
            mode="outlined"
          />

          <Text
            style={{
              marginLeft: 30,
              color: '#404040',
              fontFamily: 'Roboto-Regular',
              fontSize: 18,
              marginTop: 5,
            }}>
            Product Price:
          </Text>
          <TextInput
            value={this.props.item.price.toString()}
            theme={{roundness: 10}}
            style={{width: 400, marginLeft: 30}}
            mode="outlined"
          />

          <Text
            style={{
              marginLeft: 30,
              color: '#404040',
              fontFamily: 'Roboto-Regular',
              fontSize: 18,
              marginTop: 5,
            }}>
            Product Sale Price:
          </Text>
          <TextInput
            value={'0'}
            theme={{roundness: 10}}
            style={{width: 400, marginLeft: 30}}
            mode="outlined"
          />

          <Text
            style={{
              marginLeft: 30,
              color: '#404040',
              fontFamily: 'Roboto-Regular',
              fontSize: 18,
              marginTop: 5,
            }}>
            Product Category:
          </Text>
          <TextInput
            value={this.props.item.type}
            theme={{roundness: 10}}
            style={{width: 400, marginLeft: 30}}
            mode="outlined"
          />

          <View style={{marginLeft: 30, flexDirection: 'row', marginTop: 25}}>
            <Text style={{fontSize: 20}}>Toggle Sale:   </Text>
            <Switch thumbColor="#FF0000"/>
          </View>

          <View>
            <View style={{marginLeft: 20}}>
              <Text>{'\n'}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF5844',
                  borderRadius: 20,
                  width: 90,
                  height: 40,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 1,
                }}
                onPress={this.addItem}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 17,
                    left: 4,
                    fontWeight: '700',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Provider>
            <Portal>
              <Modal
                visible={this.state.modalVisible}
                onDismiss={this.cancelRemove}
                contentContainerStyle={{
                  backgroundColor: 'white',
                  padding: 20,
                  height: 200,
                  width: 400,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20}}>Remove Selected Photo</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <Text style={{fontSize: 20}}>Yes</Text>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback>
                    <Text
                      style={{fontSize: 20}}
                      onPress={() => {
                        this.cancelRemove();
                      }}>
                      {' '}
                      No
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              </Modal>
            </Portal>
          </Provider>

          <Text>{''}</Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
   // elevation:10,
    //height:'100%',
    //position: 'absolute',
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  body: {
    flex: 1,
    height: '8%',
    // position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#FF4C52',
  },
  carousel: {
    height: 100,
    width: 350,
    marginTop: 25,
    marginLeft: 20,
    elevation: 10,
    zIndex: 10,
    marginRight: 15,
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
    marginTop: 30,
    // position: 'absolute',
    alignItems: 'flex-end',
    width: 80,
    height: 80,
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
    elevation: 5,
    resizeMode: 'contain',
  },
  selected: {
    width: 80,
    height: 80,
    opacity: 0.5,
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

const mapDispatchToProps = (dispatch: Dispatch<SetItemActionType>) => {
  return {
    reduxSearchItemAction: (item: any) => dispatch(SetItemAction(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMerchantItems);
