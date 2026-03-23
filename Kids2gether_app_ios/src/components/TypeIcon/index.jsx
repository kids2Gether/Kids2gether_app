import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { Image } from 'react-native'
import { View } from 'react-native'

export default function TypeIcon({ title, image, onPress, color }) {

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            backgroundColor: color
          }}
        >
          <Image source={image} style={ title === 'babás' ? { width: 29, height: 41 } : { width: 35, height: 35}} />
        </View>
        <Text style={{ textTransform: 'uppercase', textAlign: 'center' }}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
