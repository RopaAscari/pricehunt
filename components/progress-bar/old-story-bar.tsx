import React, {useRef, useState, useEffect} from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';

type Props = {
    stop: boolean;
    reset: boolean;
    active: boolean
    storyAmount: number
    closeStory(): void
    nextStory(): void
}

function useInterval(callback: any, delay: any) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


const StoryProgress = (props: Props) => {
  let storyTracker = 0;
  let animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(0);

  
  useInterval(() => {

    if(props.reset) {
    //  setProgress(0)
    }

    if(progress < 100 && props.active) {
      setProgress(progress + 5);
    }
  }, 70);

  useEffect(() => {

    if(props.stop){
   /*   Animated.timing(animation.current, {
        toValue: progress,
        duration: 100,
        useNativeDriver: false
      }).stop();*/
    }
    if(props.active){
      Animated.timing(animation.current, {
        toValue: progress,
        duration: 100,
        useNativeDriver: false
      }).start();
    }
  },[progress])

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })

  if(progress === 100){
  //  props.nextStory()
  }

  if(progress === 100 && props.storyAmount === storyTracker){
   // props.closeStory()
  }

  return (
      <View style={styles(props).progressBar}>
        <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: "white", width, borderRadius: 25}]}/>
    </View>
  );
}

export default StoryProgress;

const styles = (props: Props) => StyleSheet.create({

  progressBar: {
    zIndex: 10,
    //top:'10%',
    marginTop:'5%',
    alignSelf:'center',
    flexDirection: 'row',
    height: 7,
    width: (100 /props.storyAmount).toString() + '%',
    backgroundColor: props.active?'black': 'black',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 25,
  },
  animatedStory: {backgroundColor: "white", borderRadius: 25, position: 'absolute', zIndex: 10}
});
