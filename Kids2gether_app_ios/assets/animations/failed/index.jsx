import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import failed from './animation-failed.json'

export default function AnimationFailed({ onAnimationFinish }) {
    const styles = {
        airplane_animation: {
            transform: [
                { scale: 1.3 },
            ],
        }
    }

    return (
        <AnimatedLottieView
            source={failed}
            autoPlay={true}
            loop={false}
            style={[styles.airplane_animation]}
            onAnimationFinish={onAnimationFinish}
            duration={1000}
        />
    )
}
