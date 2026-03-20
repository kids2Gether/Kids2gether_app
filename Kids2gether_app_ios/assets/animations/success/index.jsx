import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import success from './animation-success.json'

export default function AnimationSuccess({ onAnimationFinish }) {
    const styles = {
        airplane_animation: {
            transform: [
                { scale: 1.3 },
            ],
        }
    }

    return (
        <AnimatedLottieView
            source={success}
            autoPlay={true}
            loop={false}
            style={[styles.airplane_animation]}
            onAnimationFinish={onAnimationFinish}
            duration={1000}
        />
    )
}
