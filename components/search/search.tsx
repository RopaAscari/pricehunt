import {Dispatch} from 'redux'
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { landingItems } from '@data/app-data';
import {SearchItemAction} from '@actions/search-item-action'
import { SearchItemActionType} from '@constants/item-types'
import { RootState } from '@reducers/combined-reducers';
import { DARK, LIGHT, DEFAULT } from '../../constants/theme-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DarkTheme } from '@theme/dark/search-component-dark-theme';
import { View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { LightTheme } from '@theme/light/search-component-light-theme.tsx'
import { NavigationScreenProp } from 'react-navigation';

type Props = { 
    theme: any
    searchParams: string
    updateSearchField: (found: any) => void
    navigation: NavigationScreenProp<any, any>
    reduxSearchItemAction: (item: any) => void,
}

type State = {

}

 class Search extends Component<Props,State> {

    constructor(props:Props){
        super(props)
    }

   navigateToPriceHub = (item: string | undefined) => {
       this.props.reduxSearchItemAction(item)
       this.props.navigation.navigate('Price-Hub')
   }

    searchResults = () => {
        return landingItems.filter((item) => {

            if(this.props.searchParams === ''){
                return ''
            }else{
                //console.log(item.name.toLowerCase().includes(this.props.searchParams.toLowerCase()))
                return item.name.toLowerCase().includes(this.props.searchParams.toLowerCase())
            }
        }).map((item,index) => {
            return (
                <View key={index} style={styles(this.props).resultContainer}>
                    <TouchableWithoutFeedback onPress={()=> this.navigateToPriceHub(item.name)}>
                        <Text key={index} style={styles(this.props).resultText}> {item.name} ggg</Text>
                    </TouchableWithoutFeedback>
                    <Icon 
                    name="arrow-top-left" 
                    size={20} color={this.props.theme === DARK? 'white' : this.props.theme === LIGHT? 'black': '' }
                    onPress={() => this.props.updateSearchField(item.name)} />
                </View>
            )
        })
    }

render() {
        return ( 
            <View >
                <Text>fff</Text>
            {  
                //this.searchResults() 
            } 
            </View>
        )
    }
}

const styles = (props: Props) => StyleSheet.create({
    body:{
      //

      flex:1,
        backgroundColor: props.theme === DARK ? DarkTheme.backgroundColor: props.theme === LIGHT? LightTheme.backgroundColor: DEFAULT,
     width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    resultContainer:{
        top:100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginLeft: 15,
    },
    resultText:{
        fontSize: 18, 
        color: props.theme === DARK ? 'black': props.theme === LIGHT? 'black': DEFAULT,

    }
})

const mapStateToProps = (state: RootState) => {
    return {
        theme: state.theme.theme,
  }
}
const mapDispatchToProps = (dispatch: Dispatch<SearchItemActionType>) => {
    return {
            reduxSearchItemAction:(item: string) => dispatch(SearchItemAction(item)),
       }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Search);