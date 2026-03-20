import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Animated, { BounceIn, FadeOut } from 'react-native-reanimated';

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export default function ScrollToTop({ onPress, controller, reference }) {

  const handleScroll = () => {
    reference.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true
    })
  }

  return (
    <>
      {controller > 300 &&
        <TouchableOpacityAnimated
          onPress={onPress? onPress : handleScroll}
          style={styles.button_container}
          activeOpacity={0.5}
        >
          <Animated.View
            entering={BounceIn}
            exiting={FadeOut}
            style={styles.button_content}
          >
            <Icon name='arrow-upward' color={"#fff"} size={30} />
          </Animated.View>
        </TouchableOpacityAnimated>
      }
    </>
  )
}

const styles = StyleSheet.create({
  button_container: {
    padding: 10,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  button_content: {
    width: 60,
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#80CAA7',
  },
});