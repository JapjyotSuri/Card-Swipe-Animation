import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityType } from '@/data/data'

type activityProps={

    activity: ActivityType
}
const Activity = ({activity} : activityProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={activity.image} style={styles.image}></Image>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.textName}>{activity.name}</Text>
        <Text style={styles.textDate}>{activity.date}</Text>
      </View>
      <Text style={styles.textPrice}>{activity.price}</Text>
    </View>
  )
}

export default Activity

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 14,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgContainer: {
        backgroundColor: '#222222',
        borderRadius: 18,
    },
    image: {
        width: 44,
        height: 44,
        margin: 14,
        resizeMode: 'contain',
      },
      textName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
      textDate: {
        color: 'white',
        fontSize: 14,
      },
      nameContainer: {
        flex: 1,
        marginHorizontal: 16,
      },
      textPrice: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
})