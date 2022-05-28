import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import  DynamicContainer1  from '../dynamic-containerA/dynamic-container1';
import  DynamicContainer2  from '../dynamic-containerB/dynamic-container2';

type Props = {
  //index: any;
  items:any
  navigation: NavigationScreenProp<any,any>
}

export function RenderPromotions(props: Props){

  const dynamicContainers = () => {

      if(props.items.containerType == 1){
        return ( <DynamicContainer1 navigation={props.navigation} items={props.items} />)  
      } 
      else if(props.items.containerType == 2){
        return(<DynamicContainer2 navigation={props.navigation} items={props.items}/>)
      }
  }

  return (<>{ dynamicContainers() }</> )
}
