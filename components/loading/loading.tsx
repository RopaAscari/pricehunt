import { Animated, View } from 'react-native';
import React, { useRef, useEffect } from 'react';

type Props = {
    style?: any
    children:any, 
    element?: any
    isBlinking: boolean
}

export default function Loading(props: Props) {

    const fadeAnim = useRef(new Animated.Value(1)).current;
    
    useEffect(() => {
        loopAnimation();
    })

    const opacityAnimationOffsetLower = () => {
        return Animated.timing(
            fadeAnim,{
                toValue: 0.5,
                duration: 700,
                useNativeDriver: true
            }
        )
    }

    const opacityAnimationOffsetHigher = () => {
        return Animated.timing(
            fadeAnim,{
                toValue: 1.2,
                duration: 700,
                useNativeDriver: true
            }
        )
    }

    const loopAnimation = () => {
        Animated.sequence([
            opacityAnimationOffsetLower(),
            opacityAnimationOffsetHigher(),
        ]).start(() => loopAnimation())
    }

    const Element: any = ( ( props.isBlinking === true ) ? Animated.createAnimatedComponent( props && props.element || View ) : props && props.element || View );

    return (
        <Element {...props} style = {[props.style, { opacity: fadeAnim }]}>
            {props && props.children || null}
        </Element>
    )
}

