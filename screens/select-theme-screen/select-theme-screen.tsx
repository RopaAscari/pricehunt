import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import DarkModeIcon from '@icons/dark-mode-icon';
import LightModeIcon from '@icons/light-mode-icon';
import {RootState} from '@reducers/combined-reducers';
import ThemeIcon from '@components/svg/icons/theme-icon';
import Circle from 'react-native-vector-icons/MaterialIcons';
import {SetThemeActionStore} from '@constants/theme-types';
import {LIGHT, DARK, DEFAULT} from '@constants/theme-types';
import {SetUIThemeAction} from '@actions/set-ui-theme-action';
import {DarkTheme} from '@theme/dark/setting-screen-dark-theme';
import {LightTheme} from '@theme/light/setting-screen-light-theme';
import {View, Text, StyleSheet, Switch, Image} from 'react-native';
import CircleOutline from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsBackArrow from '@components/svg/icons/settings-back-arrow';

type Props = {
  theme: any;
  reduxSetUIThemeAction(theme: string): void;
};

type State = {
  light: boolean;
  dark: boolean;
  theme: boolean;
  Biometrics: boolean;
  AppNotifcations: boolean;
  EmailNotifications: boolean;
};

class SelectThemeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      theme: false,
      light: false,
      dark: false,
      AppNotifcations: false,
      EmailNotifications: false,
      Biometrics: false,
    };
  }

  componentDidMount() {
    if(this.props.theme === LIGHT){
      this.setState({ light: true })
      this.setState({dark: false});
    }else{
      this.setState({dark: true});
      this.setState({light: false});
    }
  }

  toggleTheme = (theme: string) => {
    if (theme === LIGHT) {
      this.setState({light: true});
      this.setState({dark: false});
      this.props.reduxSetUIThemeAction(theme);
    } else {
      this.setState({dark: true});
      this.setState({light: false});
      this.props.reduxSetUIThemeAction(theme);
    }
    // this.setState({theme: !this.state.theme});
    // if (this.props.theme === DARK) {
    //   this.props.reduxSetUIThemeAction(LIGHT);
    // } else if (this.props.theme === LIGHT) {
    //   this.props.reduxSetUIThemeAction(DARK);
    // }
  };

  render() {
    return (
      <View style={styles(this.props).container}>
        <View style={styles(this.props).settingsContainer}>
          <SettingsBackArrow height={25} width={25} />
          <Text style={styles(this.props).settingsText}> Settings</Text>
        </View>
        <View style={styles(this.props).margin}>
          <View style={[styles(this.props).row, {marginTop: '15%'}]}>
            <ThemeIcon height={25} width={25} />
            <View style={{left: 5}}>
              <Text style={styles(this.props).menuContentHeading}> Theme</Text>
              <Text style={styles(this.props).menuContentDescription}>
                {' '}
                Select between dark & light mode
              </Text>
            </View>
          </View>
          <View style={styles(this.props).chatLine} />

          <View style={[styles(this.props).row, styles(this.props).themeRow]}>
            <View style={styles(this.props).row}>
              <LightModeIcon height={5} width={5} />
              <Text style={styles(this.props).labelText}>Light</Text>
            </View>

            {this.state.light ? (
              <Circle
                name="circle"
                color={'#F71735'}
                style={styles(this.props).iconPosition}
                size={25}
                // onPress={() => this.toggleTheme()}
              />
            ) : (
              <CircleOutline
                name="checkbox-blank-circle-outline"
                color={'black'}
                style={styles(this.props).iconPosition}
                size={25}
                onPress={() => this.toggleTheme(LIGHT)}
              />
            )}
          </View>
          <View style={[styles(this.props).row, styles(this.props).themeRow]}>
            <View style={styles(this.props).row}>
              <DarkModeIcon height={5} width={5} />
              <Text style={styles(this.props).labelText}>Dark</Text>
            </View>
            {this.state.dark ? (
              <Circle
                name="circle"
                color={'#F71735'}
                style={styles(this.props).iconPosition}
                size={25}
                // onPress={() => this.toggleTheme()}
              />
            ) : (
              <CircleOutline
                name="checkbox-blank-circle-outline"
                color={'black'}
                style={styles(this.props).iconPosition}
                size={25}
                onPress={() => this.toggleTheme(DARK)}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      height: '100%',
      // alignItems: 'center',
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? LightTheme.backgroundColor
          : DEFAULT,
      // justifyContent: 'center'
    },
    row: {
      flexDirection: 'row',
    },
    iconPosition: {
      top: 12,
    },
    labelText: {
      fontSize: 20,
      left: 15,
      top: 10,
      fontFamily: 'Roboto-Regular',
    },
    themeRow: {
      padding: 20,
      justifyContent: 'space-between',
    },
    margin: {
      marginLeft: '7%',
    },
    chatLine: {
      borderBottomColor: '#F1F2F3',
      borderBottomWidth: 2,
      width: '95%',
      marginTop: '5%',
      alignSelf: 'center',
    },
    settingsContainer: {
      alignItems: 'center',
      marginTop: '10%',
      alignSelf: 'center',
      flexDirection: 'row',
    },
    settingsText: {
      fontSize: 30,
      fontFamily: 'Roboto-Medium',
      color: '#404040',
    },
    menuContentHeading: {
      fontSize: 20,
      color: '#404040',
      top: '5%',
      fontWeight: 'bold',
    },
    menuContentDescription: {
      color: '#A3A3A3',
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
    theme: state.theme.theme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SetThemeActionStore>) => {
  return {
    reduxSetUIThemeAction: (theme: string) => dispatch(SetUIThemeAction(theme)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectThemeScreen);
