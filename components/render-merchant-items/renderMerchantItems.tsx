import React from 'react';
import {connect} from 'react-redux';
import ApiService from '@services/api-service';
import {ScrollView} from 'react-native-gesture-handler';
import FlashMessage from '@components/flash-message/flash-message'
//import {EditMerchantItem} from '../../actions/editMerchantItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import { SetItemActionType } from '@constants/item-types';
import { Dispatch } from 'redux';
import { SetItemAction } from '@actions/set-item-action';
import { RootState } from '@reducers/combined-reducers';
//import ApiService from '../../services/ApiService'

type Props = {
  obj: any;
  user: any
  token: any
  reRenderFromDelete:() => void
  reduxEditItemAction: (obj: any) => void;
  navigation: NavigationScreenProp<any, any>;
};

function RenderMerchantItems(props: Props) {

  const [deleting, deletingItem] = React.useState(false);

  const Merch = () => {
    props.reduxEditItemAction(props.obj);
    props.navigation.navigate('View-Product');
  };

  const DeleteItem = () => {
    console.log('deleting')
    ApiService.RemoveItem(props.obj._id, props.token)
      .then(res => res.data)
      .then(res => {
        if (res == 'Item deleted successfully') {
          props.reRenderFromDelete()
          console.log('Item deleted successfully');
        } else {
          console.log('Item not deleted');
        }
      });
  };
  return (
    <View>
     
      <TouchableOpacity style={{ alignSelf: 'center'}} onPress={Merch}>
        <View style={styles.rectangle}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                source={{uri: props.obj.thumbnailImage}}
                style={styles.ImageContainer}
              />
            </View>
            <View style={{marginLeft: 5}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.ItemNameContainer}>Item Name:</Text>
                <Text style={styles.ItemNameText}>{props.obj.name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.PriceConatiner}>Price:</Text>
                <Text style={styles.PriceText}>${props.obj.price} JMD</Text>
              </View>
             {/* <View>
                <TouchableOpacity style={{position: 'absolute'}}>
                  <Text style={styles.EditItemText}>Edit Item</Text>
                </TouchableOpacity>
             </View>*/}
            </View>
            {/*<View style={{left: 390, bottom: 70, position: 'absolute'}}>
              <Icon
                name="delete-sweep"
                size={25}
                style={{zIndex: 5, elevation: 4}}
                color="#F85252"
                onPress={DeleteItem}
              />
            </View>*/}
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <Text />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 20,
    backgroundColor: 'white',
  },

  rectangle: {
    bottom: 5,
    marginTop: 5,
    width: 210 * 2,
    height: 120,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 10,
    //  shadowColor: '#000000',
    // shadowOffset: {
    //   width: 3,
    //    height: 3,
    // }
  },
  ItemNameContainer: {
    position: 'absolute',
    top: 30,
    left: 15,
    color: '#F85252',
    fontSize: 17,
    fontFamily: 'Segoe UI',
    fontStyle: 'italic',
  },
  ItemNameText: {
    position: 'absolute',
    top: 30,
    left: 110,
    color: 'black',
    fontSize: 17,
    fontFamily: 'Segoe UI',
    fontStyle: 'italic',
  },
  PriceConatiner: {
    position: 'absolute',
    top: 55,
    left: 15,
    color: '#F85252',
    fontSize: 17,
    fontFamily: 'Segoe UI',
    fontStyle: 'italic',
  },
  PriceText: {
    position: 'absolute',
    top: 56,
    left: 63,
    color: 'black',
    fontSize: 16,
    fontFamily: 'Segoe UI',
    fontStyle: 'italic',
  },
  EditItemText: {
    textAlign: 'right',
    left: 220,
    top: 85,
    position: 'absolute',
    color: '#F85252',
    fontSize: 17,
    fontFamily: 'Segoe UI',
    fontStyle: 'italic',
    zIndex: 20,
  },
  ImageContainer: {
    left: 10,
    resizeMode: 'contain',
    top: 5,
    width: 100,
    height: 100,
    borderTopLeftRadius: 20,
  },
});
const mapStateToProps = (state: RootState) => {
  return {
    step: state.step.step,
    item: state.item.item,
    user: state.user.user,
    theme: state.theme.theme,
    token: state.token.token,
    session: state.session.isloggenIn,
    isNetworkConnected: state.network.isNetworkConnected,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SetItemActionType>) => {
  return {
    reduxEditItemAction: (item: any) => dispatch(SetItemAction(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenderMerchantItems);
