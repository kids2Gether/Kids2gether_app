import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import airplane from './animation-plane.json'

export default function AirplaneAnimation({ onAnimationFinish }) {
    const [randomDirection, setRandomDirection] = useState(0);

    useEffect(() => {
        const number = [0, 270];
        let random = Math.floor(Math.random() * number.length);
        setRandomDirection(number[random])
    } ,[randomDirection]);

    const styles = {
        airplane_animation: {
            transform: [
                { scale: 1.3 },
                { rotate: `${randomDirection}deg` },
            ],
        }
    }

    return (
        <AnimatedLottieView
            source={airplane}
            autoPlay={true}
            loop={false}
            style={[styles.airplane_animation]}
            onAnimationFinish={onAnimationFinish}
            duration={1000}
        />
    )
}
