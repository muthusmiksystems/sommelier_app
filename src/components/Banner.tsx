import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, Text, Linking } from 'react-native';
import { metrices } from '../assets/metrices';
import { url } from '../assets/constantsDummy';
import { getSlideServiceHandler } from '../store/services/GetSlideService';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DEVICE_WIDTH = Dimensions.get('window').width;

const images = [
  require('../assets/foodImageOne.jpg'),
  require('../assets/foodImageTwo.jpg'),
  require('../assets/foodImageThree.jpg'),
  require('../assets/foodImageFour.jpg'),
];

const Banner = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slide, setSlide] = useState([]);
  const [mainSlides, setMainSlides] = useState([]);
  const [otherSlides, setOtherSlides] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex(prev => (prev === slide.length - 1 ? 0 : prev + 1));
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          animated: true,
          y: 0,
          x: DEVICE_WIDTH * ((selectedIndex + 1) % slide.length),
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedIndex, slide.length]);

  const fetchSlideData = async () => {
    try {
      const result = await dispatch(getSlideServiceHandler());
      setSlide(result.payload);
      setMainSlides(result.payload.mainSlides);
      setOtherSlides(result.payload.otherSlides);
    } catch (err) {
      console.error("Error fetching slide data:", err);
      // Handle errors here if needed
    }
  };

  useEffect(() => {
    fetchSlideData();
  }, []);

  const imageUrl = (imageName: any) => {
    return url + imageName;
  };
  const handleSlug = (data: any) => {
    const link = url + '/public/' + data.url;
    if (link) {
      Linking.openURL(link).catch(err => console.error("Failed to open URL:", err));
    }
  }

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const viewSize = event.nativeEvent.layoutMeasurement.width;
          const contentOffset = event.nativeEvent.contentOffset.x;
          const index = Math.floor(contentOffset / viewSize);
          setSelectedIndex(index);
        }}
        ref={scrollRef}
      >
        {
          (mainSlides.length > 0 || otherSlides.length > 0) ? (
            <>
              {mainSlides.map((slide, index) => (
                <View key={index} style={styles.backgroundImage}>
                  <TouchableOpacity onPress={() => handleSlug(slide)}>
                    <Image source={{ uri: imageUrl(slide.data.image) }} style={styles.image} />
                  </TouchableOpacity>
                </View>
              ))}
              {otherSlides.map((slide, index) => (
                <View key={index} style={styles.backgroundImage}>
                  <TouchableOpacity onPress={() => handleSlug(slide)}>
                    <Image source={{ uri: imageUrl(slide.data.image) }} style={styles.image} />
                  </TouchableOpacity>
                </View>
              ))}
            </>
          ) : (
            images.map((image, index) => (
              <Image key={index} source={image} style={styles.backgroundImage} />
            ))
          )
        }

      </ScrollView>
      <View style={styles.circleDiv}>
        {(slide.length > 0 ? slide : images).map((item, i) => (
          <Text key={i} style={selectedIndex === i ? styles.dotActive : styles.dot}>
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: metrices(38),
    width: DEVICE_WIDTH,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  circleDiv: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    fontSize: 12,
    margin: 3,
    color: 'white',
    opacity: 0.5,
  },
  dotActive: {
    fontSize: 12,
    margin: 3,
    color: 'white',
    opacity: 1,
  },
});

export default Banner;
