import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { DataType } from '@/data/data'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { SharedValue, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
type cardProps={
    item: DataType,
    index: number,
    dataLength: number,
    currentIndex: number,
    animatedValue: SharedValue<number>
    setCurrentIndex:React.Dispatch<React.SetStateAction<number>>
    setNewData: React.Dispatch<React.SetStateAction<DataType[]>>
    newData: DataType[]
}
const Card = ({item,index,dataLength,currentIndex,animatedValue, setCurrentIndex,setNewData,newData}: cardProps) => {
  const translateX=useSharedValue(0)
  const {width}= useWindowDimensions();
  const direction=useSharedValue(0);//making this so that we know in which direction to change the value of translation x to exit the screen
  const pan=Gesture.Pan().onUpdate(e => {
    const isSwipeRight=translateX.value > 0;//this tells us the card is moved in the right hand side direction
    direction.value=isSwipeRight ? 1 : -1
    console.log(e.translationX);
    if(currentIndex === index){
      translateX.value=e.translationX
      animatedValue.value=interpolate(Math.abs(e.translationX),[0,width],[index,index+1])//here we dont write [0,1] in output but give index to preserve the stack effect
      //As animatedValue approaches index + 1, the transformations such as scale and opacity will prepare the current card to exit the stack and reveal the next card below it
    }
    
  }).onEnd(e => {

    if(index === currentIndex){
      if(Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000){//meaning the abs value of translationX is greater than 150 then we need to delete it
        translateX.value=withTiming(width * direction.value,{},
          () => {
            runOnJS(setCurrentIndex)(currentIndex+1);//if direction is -1 it will exit the scree from the left and if it is 1 it wil exit the screen from right
        //the curly braces represents optional parameter to set animation configuration, like duration
        //runOnJS is a reanimated utility function that allows us to call JavaScript functions from within a Reanimated callback
       //this allows us to run js functions on the js thread
        //js thread is slower as compared to ui thread
        runOnJS(setNewData)([...newData,newData[currentIndex]])//here we keep on adding the current Item to the back of the new data to make an infinite loop of cards
          } );
        animatedValue.value=withTiming(currentIndex + 1)
     }
     else{
       translateX.value=withTiming(0,{duration: 500});
       animatedValue.value=withTiming(currentIndex)
     }
    }
    
  })
  
  const animatedStyle=useAnimatedStyle(() => {
  const rotateZ=interpolate(Math.abs(translateX.value),[0,width],[0,20]);
  const translateY=interpolate(animatedValue.value,[index-1,index],[-30,0])//index keep on changing so first the value index-1 means that the card we are currently writing th ecode is the card tht is below the the currentIndex meaning currentIndex=index-1 where index is the index of the card whose code is being written
  const scale=interpolate(animatedValue.value,[index-1,index],[0.9,1])
  const opacity=interpolate(animatedValue.value + 3,[index,index+1],[0,1])//animatedValue.value + 3 ensures cards that are 3 or more layers deep are partially transparent.
    return {
      opacity: index < (3 + currentIndex) ? 1 : opacity ,
      transform: [
        {
          translateX: translateX.value
        },
        {
          scale: currentIndex === index ? 1 : scale,//last index is going to be the smallest and 0th index is going to be the biggest
        },
        {
          translateY: currentIndex === index ? 0 : translateY,

        },
        {
          rotateZ: index === currentIndex ? `${direction.value * rotateZ}deg` : '0deg'
        },

      ],
    }
  }
    )
  return (
    <GestureDetector gesture={pan}>
    <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: item.backgroundColor,
            zIndex: dataLength-index,
            
           
          },
          animatedStyle

          
        ]}>
        <View style={styles.top}>
          <Text style={styles.textName}>{item.name}</Text>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
        </View>
        <View style={styles.middle}>
          <Text style={styles.textNumber}>{item.number}</Text>
        </View>
        <View style={styles.bottom}>
          <View>
            <Text style={styles.text}>Valid thru</Text>
            <Text style={styles.text}>{item.exp}</Text>
          </View>
          <View>
            <Text style={styles.text}>Cvv</Text>
            <Text style={styles.text}>{item.cvv}</Text>
          </View>
        </View>
      </Animated.View>
      </GestureDetector>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 360,
        height: 200,
        borderRadius: 28,
        padding: 16, 
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      textName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
      },
      imageContainer: {
        width: 80,
        height: 40,
      },
      image: {
        width: 80,
        height: 40,
        resizeMode: 'contain',
      },
      middle: {
        flex: 2,
        justifyContent: 'center',
      },
      textNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
      },
      text: {
        fontSize: 18,
        color: 'white',
      },
      bottom: {
        flex: 1,
        flexDirection: 'row',
        gap: 56,
      },
})