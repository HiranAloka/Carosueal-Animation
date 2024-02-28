import React from 'react';
import {Dimensions, Pressable, SafeAreaView, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Carousel  from 'react-native-reanimated-carousel';
import {withAnchorPoint} from './anchor-points';
// import HorizantalTransacation from './HorizantalTransaction';

export interface Props {
  animationValue: Animated.SharedValue<number>;
  label: number;
  index?: number;
  onPress?: () => void;
}

function App(): React.ReactElement {
  const screenWidth = Dimensions.get('window').width;
  const data: number[] = [...new Array(6).keys()];
  const PAGE_WIDTH = screenWidth;
  const PAGE_HEIGHT = screenWidth * 0.8;

  const colors = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
  ];

  const renderItem = ({item}: {item: number}) => {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          justifyContent: 'center',
          backgroundColor: colors[item],
        }}>
        <Text style={{textAlign: 'center', fontSize: 30}}>{item}</Text>
      </View>
    );
  };

  const Item: React.FC<Props> = props => {
    const {animationValue, label, onPress} = props;

    const containerStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0.5, 1, 0.5],
        Extrapolate.CLAMP,
      );

      return {
        opacity,
      };
    }, [animationValue]);

    const labelStyle = useAnimatedStyle(() => {
      const scale = interpolate(animationValue.value, [-1, 0, 1], [1, 1.25, 1]);

      const color = interpolateColor(
        animationValue.value,
        [-1, 0, 1],
        ['#b6bbc0', '#0071fa', '#b6bbc0'],
      );

      return {
        transform: [{scale}],
        borderColor: color,
      };
    }, [animationValue]);

    return (
      <Animated.View
        style={[
          {
            // flex: 1,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors[label],
            borderRadius: 50,
            marginHorizontal: 20,
            width: 60,
            height: 60,
          },
          labelStyle,
          containerStyle,
        ]}>
        <Animated.Text style={[{fontSize: 18, color: '#26292E'}]}>
          {label}
        </Animated.Text>
      </Animated.View>
    );
  };

  const Item2: React.FC<{
    index: number;
    animationValue: Animated.SharedValue<number>;
  }> = ({index, animationValue}) => {
    const WIDTH = PAGE_WIDTH / 1.5;
    const HEIGHT = PAGE_HEIGHT / 1.5;

    const cardStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        animationValue.value,
        [-0.1, 0, 1],
        [0.95, 1, 1],
        Extrapolate.CLAMP,
      );

      const translateX = interpolate(
        animationValue.value,
        [-1, -0.2, 0, 1],
        [0, WIDTH * 0.3, 0, 0],
      );

      const transform = {
        transform: [
          {scale},
          {translateX},
          {perspective: 200},
          {
            rotateY: `${interpolate(
              animationValue.value,
              [-1, 0, 0.4, 1],
              [30, 0, -25, -25],
              Extrapolate.CLAMP,
            )}deg`,
          },
        ],
      };

      return {
        ...withAnchorPoint(
          transform,
          {x: 0.5, y: 0.5},
          {width: WIDTH, height: HEIGHT},
        ),
      };
    }, [index]);

    return (
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={[
            {
              backgroundColor: colors[index],
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              width: WIDTH,
              height: HEIGHT,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.44,
              shadowRadius: 10.32,

              elevation: 16,
            },
            cardStyle,
          ]}>
          <Animated.Text style={[{fontSize: 18, color: '#26292E'}]}>
            {index}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Carousel
          loop
          width={75}
          height={75}
          data={data}
          autoPlay
          style={{
            width: '100%',
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          scrollAnimationDuration={1000}
          onSnapToItem={(index: number) => console.log('current index:', index)}
          renderItem={({item, animationValue}) => {
            return <Item animationValue={animationValue} label={item} />;
          }}
        />
        <Carousel
          loop
          width={280}
          height={200}
          data={data}
          vertical
          modeConfig={{snapDirection: 'left', stackInterval: 20}}
          mode="vertical-stack"
          customConfig={() => ({type: 'positive', viewCount: 2})}
          autoPlay
          style={{
            width: '100%',
            height: 300,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          scrollAnimationDuration={1000}
          onSnapToItem={(index: number) => console.log('current index:', index)}
          renderItem={renderItem}
        />

        <Carousel
          loop
          width={PAGE_WIDTH}
          height={PAGE_HEIGHT}
          autoPlay
          withAnimation={{
            type: 'spring',
            config: {
              damping: 13,
            },
          }}
          data={colors}
          onSnapToItem={(index: number) => console.log('current index:', index)}
          renderItem={({item, index, animationValue}) => {
            return (
              <Item2
                animationValue={animationValue}
                key={index}
                index={index}
              />
            );
          }}
        />
        {/* <HorizantalTransacation /> */}
      </View>
    </SafeAreaView>
  );
}

export default App;
