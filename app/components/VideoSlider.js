import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AppTheme from '../styles/AppTheme';
import {Themes} from '../store/utils/branchData';

const {greySecondary} = AppTheme.colors;

const VideoSlider = ({images, ...props}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({item}) => {
    // console.log("image path -> ", item.file);
    if(item.file){
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: item.file}} style={styles.image} resizeMode="cover" />
        </View>
      );
    }else{
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={item} style={styles.image} resizeMode="cover" />
        </View>
      );
    }
   
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={(images?.length>20)?20:images?.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={{...styles.dot, backgroundColor: Themes[props.app.branch]}}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.8}
        inactiveDotScale={1}
        dotContainerStyle={{marginHorizontal: 2}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        data={images}
        sliderWidth={AppTheme.metrics.deviceWidth}
        itemWidth={AppTheme.metrics.deviceWidth}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
        inactiveSlideOpacity={1}
      />
      {pagination()}
    </View>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
  app: state.appReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VideoSlider);

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 7,
    paddingTop: 0,
    paddingBottom: 0,
  },
  dot: {
    borderRadius: 0,
    width: RFValue(20),
    height: RFValue(5),
    marginHorizontal: 0,
    marginLeft: 0,
    paddingLeft: 0,
  },
  inactiveDot: {
    backgroundColor: greySecondary,
    width: RFValue(10),
  },
  image: {
    borderRadius: RFValue(10),
    height: RFValue(230),
    width: AppTheme.metrics.deviceWidth + 10,
  },
});
