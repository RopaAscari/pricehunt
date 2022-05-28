//import { ReactReduxContext } from 'react-redux'
import React, {Dispatch, useEffect, useState} from 'react';
import {connect} from 'react-redux';
//import ApiService from '../../services/ApiService'
//import PTRView from 'react-native-pull-to-refresh';
import ApiService from '@services/api-service';
import Loading from '@components/loading/loading';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {Card} from 'react-native-paper';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Alert,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationScreenProp} from 'react-navigation';
import {RootState} from '@reducers/combined-reducers';
import {SetItemAction} from '@actions/set-item-action';
import {SetItemActionType} from '@constants/item-types';
//import FlashMessage from '@components/flash-message/flash-message';
import RenderMerchantItems from '@components/render-merchant-items/renderMerchantItems';
import MerchantBackArrowIcon from '@components/svg/icons/merchant-back-arrow';
import {Picker} from '@react-native-picker/picker';

type Props = {
  user: any;
  account: any;
  navigation: NavigationScreenProp<any, any>;
};

type State = {
  test: string;
  noItem: boolean;
  item: Array<any>;
  loading: boolean;
  deleted: boolean;
  refreshing: boolean;
};

class GetMerchantItems extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      test: '',
      item: [],
      noItem: false,
      loading: true,
      deleted: false,
      refreshing: false,
    };
  }

  async componentDidMount() {
    await this.getItem();
  }

  reRenderFromDelete = async () => {
    await this.getItem();

    showMessage({
      message: 'Item Deleted',
    });
  };

  getItem = async () => {
    await ApiService.GetMerchantItem(this.props.user._id)
      .then(res => res.data)
      .then(res => {
        switch (res) {
          case 'Item not found!': {
            this.setState({noItem: true});
            this.setState({loading: false});
            break;
          }
          case res:
            {
              this.setState({item: res});
              this.setState({loading: false});
              break;
            }
            defaut: {
              console.log('An error has occured');
            }
        }
      })
      .catch(err => {
        console.log(Error);
      });
  };

  Fetch = () => {
    if (this.state.item.length === 0) {
      return <Text>You have no items</Text>;
    } else {
      return this.state.item.map((data, name) => {
        return (
          <RenderMerchantItems
            obj={data}
            key={name}
            navigation={this.props.navigation}
            reRenderFromDelete={this.reRenderFromDelete}
          />
        );
      });
    }
  };

  apiLoadingState = () => {
    const load = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return load.map((i, k) => {
      return (
        <Loading key={k} isBlinking={true}>
          <View key={k} style={styles.rectangle} />
        </Loading>
      );
    });
  };

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this._refreshListView()}
      />
    );
  }
  _refreshListView() {
    this.setState({refreshing: true});
    this.setState({loading: false}, async () => {
      await this.getItem();
    });
    this.setState({refreshing: false});
  }

  NoItems = () => {
    return <Text>You have no items</Text>;
  };

  render() {
    const item = {
      bottom: 5,
      marginTop: 10,
      width: 210 * 2,
      height: 120,
      borderRadius: 25,
    };

    const itemLayout = [item, item, item, item, item, item];

    return (
      <React.Fragment>
        <View style={styles(this.props).body}>
          <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
            <MerchantBackArrowIcon height={7} width={7} />
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                marginTop: 20,
                fontWeight: 'bold',
              }}>
              {' '}
              Products
            </Text>
          </View>
        </View>

        <ScrollView
        style={{    
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
           top:'9%',
          position: 'absolute',
          backgroundColor: 'white',
        }}
          refreshControl={this._refreshControl()}
          contentContainerStyle={styles(this.props).container}>
          <FlashMessage
            duration={2000}
            icon={'warning'}
            titleStyle={{color: 'white', fontSize: 15}}
            position="bottom"
            textStyle={{}}
            style={{backgroundColor: '#0D0F25'}}
          />
          {this.state.deleted ? (
            <FlashMessage message={'Item was deleted'} />
          ) : null}
          <SkeletonContent
            layout={itemLayout}
            boneColor={'#F1F2F3'}
            containerStyle={{marginTop: '5%'}}
            isLoading={this.state.loading}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#2E2E2E',
                  fontSize: 20,
                  marginBottom: 30,
                  fontFamily: 'Roboto-Bold',
                }}>
                Sort By :
              </Text>
              <Picker
                mode="dropdown"
                selectedValue={'this.state.language'}
                style={{
                  height: 50,
                  width: 100,
                  borderColor: 'black',
                  borderWidth: 1,
                  bottom: 10,
                }}
                // onValueChange={(itemValue, itemIndex) =>
                /// this.setState({language: itemValue})}
                //
              >
                <Picker.Item label="Price" value="Price" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
            <View style={{alignItems:'center'}}>{this.Fetch()}</View>
          </SkeletonContent>
          <Text>{'\n\n\n\n\n\n'}</Text>
        </ScrollView>
      </React.Fragment>
    );
  }
}
const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      //flex: 1,
     // elevation: 10,
     alignItems: 'center',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
  
    },
    body: {
      //flex: 1,
      height: '10%',
      // position: 'absolute',
      alignItems: 'center',
      backgroundColor: '#FF4C52',
    },
    rectangle: {
      marginTop: 20,
      bottom: 20,
      width: 210 * 2,
      height: 120,
      backgroundColor: 'grey',
      borderRadius: 25,
      shadowColor: '#000000',
      shadowOffset: {
        width: 3,
        height: 3,
      },
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
    reduxSetItemAction: (item: any) => dispatch(SetItemAction(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetMerchantItems);
