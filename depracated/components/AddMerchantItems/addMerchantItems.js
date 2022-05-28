import React from 'react';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
//import ApiService from '../../services/ApiService'
import AsyncStorage from '@react-native-community/async-storage';
import {Text,StyleSheet,View,Modal,TextInput,TouchableOpacity,Image, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import AddIcon from '../SvgComponents/Icons/AddItemIcon/addItemIcon';
//import ImageService from '../../services/UploadImages'
import {connect} from 'react-redux'

 export default class AddMerchantItems extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            encodedBase64:'',
          //  multipleEncodedBase64:'',
            photo:'',
            image:'',
            description:'',
            modalVisible:false,
            name:'',type:'',price:'',ID:'', photo:'',thumbnailImage:'',imageStored:[],
            item:[],test:'',test1:'',merch:'',images:'', thumbail:'',profile:'',
            url:'',loading:true,
            tester:[
                'testing1',
                'testing2',
                'testing3',
                'testing4',
                'testing5',
            ], 
            check:false,
            thumb:false,
            selected:0,
            merchant:'',
            image:{}
        }
    }

componentDidMount(){
    console.log()
}

 format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };



/*addItem = () => {
    let price = this.format(this.state.price);
    let Item = {name:this.state.name,type:this.state.type,price:price,merchantId:this.props.userInfo._id,thumbnailImage:this.state.thumbnail,
        images:this.state.imageStored,description:this.state.description,merchantName:this.props.userInfo.companyName}
   console.log(Item)
     ApiService.AddItem(Item,this.props.accountStatus.auth.token).then(res=>res.data).then((res)=>{
        if(res){
            console.log(res)  
            Alert.alert("Item Added")  
        }
    })
}*/

chooseThumbnailImage = async() => {
  const options = {};
     ImagePicker.launchImageLibrary(options,(response)=>{
        if(response.uri){
            this.setState({check:true})
            const image = {image, name:response.fileName, uri:response.uri, base64: response.data, type:'image/jpeg'}
         //   ImageService.UploadImages(image)
        }
     })
  
}

onChangeText = (key, val) => {
    this.setState({ [key]: val})
}

setModalVisible = () => {
    this.setState({modalVisible:!this.state.modalVisible})
}

 setThumbnail = (i,k) => {
this.setState({selected:k})
this.setState({thumbnail:i})
console.log("Thumbail Set")
 }

Images = () => {
    if(this.state.check === true){
        this.state.imageStored.push(this.props.imageUrl)
        this.setState({check:false})
    }
    if(this.state.imageStored.length > 0){
        return this.state.imageStored.map((i,k) =>{
        return(
         <>
           <View key={k} style={{padding:10,alignSelf:'center'}}>
                <View key={k}  style={styles.rectangle}>
                    <Icon1 size={20} name="delete-empty" style={{top:22,left:33,zIndex:5}} color="black" onPress={()=>{i=null,k=null}}></Icon1>
                    <TouchableOpacity key={k} onPress={()=>{this.setThumbnail(i,k)}}>
                        <Image key={k} source={{uri: i,isStatic: true}} style={k==this.state.selected? styles.selected:styles.smallerImage}/>                    
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )})
   } else{
       return(null)
   }
}


render(){
  return(
   <ScrollView>
    <View style={styles.container}>  
    <Text>{"\n\n\n"}</Text>
  
  <View style={{  marginLeft:35}}>
        <View style={{flexDirection:'row'}}> 
            <Text style={{fontSize:20,color:'#ED4E4E'}}>Item Name{"\n"}</Text>
            <TextInput  name="name" onChangeText={val => this.onChangeText('name', val)} style={{height:33,width:160,borderColor:'grey',borderWidth:1,borderRadius:9,left:10,fontSize:12,bottom:4}}></TextInput>
        </View>

        <View style={{flexDirection:'row'}}> 
            <Text style={{fontSize:20,color:'#ED4E4E'}}>Item Type{"\n"}</Text>
            <TextInput name="type" onChangeText={val => this.onChangeText('type', val)}  style={{height:33,width:130,borderColor:'grey',borderWidth:1,borderRadius:9,left:15,fontSize:12,bottom:4}}></TextInput>
        </View>
        

        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20,color:'#ED4E4E'}} >Item Price</Text>
            <TextInput  name="price" onChangeText={val => this.onChangeText('price', val)} style={{height:33,width:90,borderColor:'grey',borderWidth:1,borderRadius:9,left:10,fontSize:12,bottom:4}}></TextInput>
        </View>
</View>

<View style={{alignItems:'center'}}>
    <View elevation={30} style={styles.rectangle2}>
        { this.props.imageUrl?
       
        <Image source={{uri:this.props.imageUrl}} style={{ width: 230, height: 230,top:25,resizeMode:'contain'  }}/>
        :<Icon name="image" size={160} style={{top:60}} color="grey"/>
}
    </View>
</View>
<Text>{"\n\n"}</Text>

<View style={{marginLeft:30,}}>
    <Text style={{color:'#ED4E4E',fontSize:20}}>Upload Images</Text>
</View>


<View style={{flexDirection:'row'}}>
<View style={{marginTop:0,height:80,width:250,marginLeft:70}}> 
            
            <ScrollView horizontal={true} pagingEnabled style={{height:70,width:250}} showsHorizontalScrollIndicator={false}>
            {
                this.Images()
            }   
            </ScrollView>         
</View>

<View elevation={30} style={styles.add}>
    <View style={{top:10}}>
        <TouchableOpacity onPress={this.chooseThumbnailImage}>
            <AddIcon />
        </TouchableOpacity>
    </View>
</View>

</View>

<Text>{"\n"}</Text>

<View style={{marginLeft:30,}}>
    <Text style={{color:'#ED4E4E',fontSize:20}}>Description</Text>
</View>
<View style={{alignItems:'center'}}>
    <TextInput style={{height:150,width:375,borderColor:'grey',borderWidth:1,borderRadius:15,top:10,textAlignVertical:'top'}} name="description" onChangeText={val => this.onChangeText('description', val)}></TextInput>
</View>
<View>
    <View style={{marginLeft:20}}>
        <Text>{"\n"}</Text>
<TouchableOpacity style={{backgroundColor:'#EFB926', borderRadius:10,width: 90,height:27,padding:1}} onPress={this.addItem}>
        <Text style={{color:'white',fontSize:17,left:4,fontWeight:'700'}}>Save Item</Text>
</TouchableOpacity>
           </View>  
</View>

<Text>{"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}</Text>

</View>
</ScrollView>
    )
  }
}
const styles = StyleSheet.create({

container:{
   
    backgroundColor:'white',
    
  
   },
   centeredView: {

    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height:600,width:350,

    alignItems: "center",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 20,
      height: 20
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  TextInput:{
    backgroundColor:'white',
    width:220,
    height:40,
    bottom:15,
    top:15,
    borderBottomColor:'grey',
    borderBottomWidth:0.5,
},
Description:{
    backgroundColor:'white',
    width:220,
    height:80,
    bottom:15,
    top:15,
    borderBottomColor:'grey',
    borderBottomWidth:0.5,
},
rectangle2:{
    top:20,
 alignItems:'center',
 width: 400,
 height: 300,
 borderColor:'black',
 backgroundColor: "white",
 borderRadius:17,
 shadowColor: '#000000',
 shadowOffset: {
   width: 20,
   height: 20,
}
},rectangle:{
    bottom:20,
    alignItems:'center',
    width: 80,
    height: 80,
    //borderWidth:1,
    borderColor:'grey',
    backgroundColor: "white",
    borderRadius:17,
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
  }
   },
   add:{
    left:40,
    alignItems:'center',
    width: 80,
    height: 80,
    //borderColor:'black',
    backgroundColor: "white",
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
  }
   },
   smallerImage:{
    width: 50, height: 50, top:12
   },
   selected:{
       width: 70, height: 70, top:12,
       borderColor:'#ED4E4E',
       borderWidth:1,
       //borderRadius:14
   }
})

/*const mapStatetoProps = (state) =>{
    return{
        imageUrl : state.image.url,
        userInfo: state.account.userObj,
        accountStatus : state.account.loginStatus,
    }
}
export default connect(mapStatetoProps,null)(AddMerchantItems);*/