import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-paper';
import {StyleSheet, Text, TouchableOpacity, View, Alert,KeyboardAvoidingView,ScrollView, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CreateChatInstanceAction} from '@actions/create-chat-instance-action';
import {ToggleRouterBarVisibilityAction} from '@actions/toggle-router-bar-visibility-action';

// eslint-disable-next-line react/prefer-stateless-function
class Reply extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
        reply: '',
        keyboardPosition: 20
    }
    this._keyboardDidShow = this._keyboardDidShow.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
    );
}

componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
}

_keyboardDidShow(event) {
    this.setState({
      keyboardPosition: event.endCoordinates.height,
    })
}

_keyboardDidHide() {
    this.setState({
      keyboardPosition: 20,
    })
}
  

  navigateToMerchantChat = () => {
    this.props.closeModal();
    this.messageMerchant();
  };

  messageMerchant = () => {
    const hunter = {
      id: this.props.user._id,
      name: this.props.user.username,
      photo: this.props.user.profilePic,
    };

    const merchant = {
      id: this.props.merchant.id,
      name: this.props.merchant.username,
      photo: this.props.merchant.profile,
    };

    const latestMessage = {
      text: '',
      createdAt: '',
    };

    let chatId = ''; // as any;

    if (hunter.id < merchant.id) {
      chatId = hunter.id + '-' + merchant.id;
    } else {
      chatId = merchant.id + '-' + hunter.id;
    }

    const reply = {
      id: this.props.user._id,
      text: this.state.reply,
      image: this.props.story,
      createdAt: new Date().getTime(),
      user: {
        _id: '1',
      },
      pending: false,
    };

    const chat = {chatId, hunter, merchant, latestMessage, reply};

   // console.log('REPLY', reply)

   this.props.navigation.navigate('Message');
    this.props.reduxCreateChatInstanceAction(chat);
    this.props.reduxToggleRouterBarVisibilityAction(false);
  };

  textChangeHandler = async (key, val) => {
    await this.setState({ [key]: val });
}

  render() {
    //console.log(this.state.keyboardPosition)
    return (
      <KeyboardAvoidingView behaviour="padding" enabled={true} style={styles.readMoreWrapper}>
      <ScrollView>
       
        <TextInput
          onFocus={() => this.props.pauseStory()}
          onBlur={() => this.props.playStory()}
          value={this.state.reply}
          onSubmitEditing={ () => this.navigateToMerchantChat()}
          placeholder={'Reply'}
          onChangeText={val => this.textChangeHandler('reply', val)}
          style={{width: 450, marginBottom: this.state.keyboardPosition, backgroundColor: '#DEDEDE'}}
          mode="outlined"
          right={<TextInput.Icon name={() =>  <Icon onPress={() => this.navigateToMerchantChat()} name="send" color="#1A8FE3" size={25}/>} />} 
          theme={{
            roundness: 20,
            colors: {error: 'red', primary: 'transparent'},
          }}
        />

        {/*<TouchableOpacity onPress={() => this.navigateToMerchantChat()} style={styles.readMoreWrapper}>
        <View style={styles.readMore}>
          <Icon name="chevron-up" size={20} color="white" />
        </View>
        <Text style={styles.readText}>Reply</Text>
    </TouchableOpacity>*/}
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  readMore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  readText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
    marginTop: 8,
  },
  readMoreWrapper: {
    position: 'absolute',
    bottom: 25,
    width: '98%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    reduxToggleRouterBarVisibilityAction: visibility =>
      dispatch(ToggleRouterBarVisibilityAction(visibility)),
    reduxCreateChatInstanceAction: chatObj =>
      dispatch(CreateChatInstanceAction(chatObj)),
  };
};

const mapStatetoProps = state => {
  return {
    item: state.item.item,
    user: state.user.user,
    theme: state.theme.theme,
    storeRef: state.storeRef.storeRef,
    isloggenIn: state.session.isloggenIn,
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Reply);
