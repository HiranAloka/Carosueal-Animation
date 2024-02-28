import {Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const HorizantalTransacation = () => {
  const data: number[] = [...new Array(6).keys()];
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
  return (
    <Carousel
      loop
      width={280}
      height={200}
      data={data}
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
  );
};

export default HorizantalTransacation;
