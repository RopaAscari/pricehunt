import React from 'react';
import {connect} from 'react-redux';
import ApiService from '@services/api-service';
import {Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AddIcon from '@icons/add-item-icon';

type Props = {
userInfo: any
accountStatus: any
imageUrl: string
}

type State = {

  encodedBase64: string
  //  multipleEncodedBase64:'',
  photo: string
  image: string
  description: string
  modalVisible: boolean,
  name: string
  type: string
  price: number | undefined
  ID: string
  photoString: string
  thumbnailImage: string
  imageStored: Array<any>
  item: Array<any>
  test: string
  test1: string
  merch: string
  images: string
  url: string
  loading: true,
  removing: boolean;
  tester: Array<any> 
  thumbnail: string
  profile: string
  currentSelectedImage: string
  check: boolean,
  thumb: boolean,
  selected: number,
  merchant: string,
  imageObj: any,

}

export default class AddMerchantItems extends React.Component<Props,State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      encodedBase64: '',
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
      currentSelectedImage:'',
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
    console.log();
  }

  format = (amount: any) => {
    return parseInt(Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,'));
  };

  addItem = () => {
    let price = this.format(this.state.price);
    let Item = {name:this.state.name,type:this.state.type,price:price,merchantId:this.props.userInfo._id,thumbnailImage:this.state.thumbnail,
        images:this.state.imageStored,description:this.state.description,merchantName:this.props.userInfo.companyName}

     ApiService.AddItem(Item,this.props.accountStatus.auth.token).then(res=>res.data).then((res)=>{
        if(res){
            console.log(res)  
            Alert.alert("Item Added")  
        }
    })
}

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
        this.setState({ imageStored: [...this.state.imageStored, ...[image] ] })
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
  }

  removeImage = () => {
    //this.setState({ removing: true })
    this.setModalVisible()
  }

  cancelRemove = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  Images = () => {
    if (this.state.imageStored.length > 0) {
      return this.state.imageStored.map((i, k) => {
        return (
          <>
            <View key={k} style={{padding: 10, alignSelf: 'center'}}>
              <View key={k} style={styles.rectangle}>
               {  10202 === this.state.selected? 
                  <Icon1
                      key={k}
                      size={20}
                      name="delete-empty"
                      style={{top: 22, left: 33, zIndex: 5}}
                      color="black"
                      onPress={() => {
                        (i = null), (k = 0);
                      }}
                    /> : null
                }
                <TouchableOpacity
                  key={k}
                  onLongPress={() => this.removeImage()}
                  onPress={() => {
                    this.selectCurrentImage(i.base64, k);
                  }}>
                  <Image
                    key={k}
                    source={{uri:`data:image/jpeg;base64,${i.base64}`}}
                    style={
                      k === this.state.selected
                        ? styles.selected
                       : styles.smallerImage
                    }
                  />
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
      <ScrollView>
        <View style={styles.container}>
          <Text>{'\n\n\n'}</Text>

          <View style={{marginLeft: 35}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20, color: '#ED4E4E'}}>
                Item Name{'\n'}
              </Text>
              <TextInput
               // name="name"
                onChangeText={val => this.onChangeText('name', val)}
                style={{
                  height: 33,
                  width: 160,
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderRadius: 9,
                  left: 10,
                  fontSize: 12,
                  bottom: 4,
                }}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20, color: '#ED4E4E'}}>
                Item Type{'\n'}
              </Text>
              <TextInput
               // name="type"
                onChangeText={val => this.onChangeText('type', val)}
                style={{
                  height: 33,
                  width: 130,
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderRadius: 9,
                  left: 15,
                  fontSize: 12,
                  bottom: 4,
                }}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20, color: '#ED4E4E'}}>Item Price</Text>
              <TextInput
              //  name="price"
                onChangeText={val => this.onChangeText('price', val)}
                style={{
                  height: 33,
                  width: 90,
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderRadius: 9,
                  left: 10,
                  fontSize: 12,
                  bottom: 4,
                }}
              />
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <View style={styles.rectangle2}>
              {this.state.currentSelectedImage ? (
                <Image
                source={{uri:`data:image/jpeg;base64,${this.state.currentSelectedImage}`}}
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
          <Text>{'\n\n'}</Text>

          <View style={{marginLeft: 30}}>
            <Text style={{color: '#ED4E4E', fontSize: 20}}>Upload Images</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{marginTop: 10, height: 150, width: 350}}>
              <ScrollView
                horizontal={true}
                pagingEnabled={true}
                style={{height: 100, width: 350, marginLeft: 30}}
                showsHorizontalScrollIndicator={true}>
                {this.Images()}
              </ScrollView>
            </View>

            <View style={styles.add}>
              <View style={{top: 20}}>
                <TouchableOpacity onPress={this.chooseThumbnailImage}>                             
                <AddIcon height={35} width={35}/>    
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text>{'\n'}</Text>

          <View style={{marginLeft: 30}}>
            <Text style={{color: '#ED4E4E', fontSize: 20}}>Description</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={{
                height: 150,
                width: 375,
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 15,
                top: 10,
                textAlignVertical: 'top',
              }}
              //name="description"
              onChangeText={val => this.onChangeText('description', val)}
            />
          </View>
          <View>
            <View style={{marginLeft: 20}}>
              <Text>{'\n'}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#EFB926',
                  borderRadius: 10,
                  width: 90,
                  height: 27,
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
                  Save Item
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Provider>
                <Portal>
                  <Modal
                    visible={this.state.modalVisible}
                    onDismiss={this.cancelRemove}
                    contentContainerStyle={{   backgroundColor: 'white',
                    padding: 20,
                    height: 200,
                    width: 400,
                    alignSelf: 'center',
                    alignItems:'center'
                   }}>
                    <Text style={{fontSize:20}}>Remove Selected Photo</Text>
                    <View style={{flexDirection:'row', marginTop: 10, justifyContent: 'space-between'}}>
                      <TouchableWithoutFeedback onPress={()=>{}}>
                        <Text style={{fontSize:20}}>Yes</Text>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback>
                        <Text style={{fontSize:20}} onPress={()=>{this.cancelRemove()}}>           No</Text>
                      </TouchableWithoutFeedback>
                    </View>
                  </Modal>
                </Portal>
            </Provider>

          <Text>{'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'}</Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    zIndex:100,
    elevation: 5,
    resizeMode: 'contain'
  },
  selected: {
    width: 80,
    height: 80,
    opacity: 0.5,
    resizeMode: 'contain'
  },
});

/*const mapStatetoProps = (state) =>{
    return{
        imageUrl : state.image.url,
        userInfo: state.account.userObj,
        accountStatus : state.account.loginStatus,
    }
}
export default connect(mapStatetoProps,null)(AddMerchantItems);*/
