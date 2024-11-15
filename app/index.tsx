import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import {data} from '../data/data'
import Card from '@/components/Card'
import { useSharedValue } from 'react-native-reanimated'
import Activity from '@/components/Activity'
const HomeLayout = () => {
    const [newData,setNewData]=useState([...data])
    const [currentIndex,setCurrentIndex]=useState(0)//we are adding this so that we can only move the current card and not the cards before it
    const animatedValue=useSharedValue(0)//we have made this to change the style of the cards behind the current card
  return (
    <GestureHandlerRootView  style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
            <View style={styles.cardContainer}>
            {
                
                newData.map((item,index) => {
               
                  if(index > currentIndex + 3 || index < currentIndex){//this condition is added to not show cards having index less than the current index or which have been swiped completely tio avoid them from overlapping in the ui and it returns null for the cards that have index more than current index +3 as we only want to show 3 cards
                    return null
                  }
                  return <Card key={index} item={item} index={index} dataLength={newData.length} currentIndex={currentIndex} animatedValue={animatedValue} setCurrentIndex={setCurrentIndex} setNewData={setNewData} newData={newData}/>
                })  
              }
            </View>
            <Text style={styles.text}>Recent Activity</Text>
            <View style={styles.activityContainer}>
            <ScrollView style={{width: '100%'}}>
              {
                newData[currentIndex].activity.map((activity,index) => (
                  <Activity activity={activity} key={index}/>
                ))
              }
              </ScrollView>
            </View>
            
    
    
    </SafeAreaView>
    </GestureHandlerRootView>
    
  )
}

export default HomeLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111'
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
      color: 'white',
      fontSize: 32,
      fontWeight: 'bold',
      paddingHorizontal: 16
    },
    activityContainer: {
      flex: 3/2,
      justifyContent: 'center',
      alignItems: 'center'
    }
})