import { Stack, Tabs } from 'expo-router'
import React from 'react'
import { View } from 'react-native'


const _layout = () => {
   return <Stack>
    <Stack.Screen name='index' options={{
        headerShown: false
    }}></Stack.Screen>
     
   </Stack>
}

export default _layout
