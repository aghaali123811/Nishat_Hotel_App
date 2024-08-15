import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { RFValue } from 'react-native-responsive-fontsize';
import Routes from '../navigations/Routes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Themes, Rooms } from '../store/utils/branchData';
import { getRooms, getAllRooms } from '../store/actions/AppActions';
import FastImage from '../utils/Image';
import AsyncStorage from '@react-native-community/async-storage';
const { PFregular } = AppTheme.fonts;

const RoomsList = ({ navigation, marginLeft, roomException = 0, ...props }) => {
  const [rooms, setRooms] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    (async () => {
      let data = (await AsyncStorage.getItem('user')) || {};
      if (Object.keys(data).length > 0) {
        data = JSON.parse(data);
        setEmail(data.user_email);
        getRooms(data.user_email)
      } 
    })();
    getRooms()

  }, []);

  const getRooms = async (userEmail) => {
    let hotel_id = props.app.branch == 'Nishat Johar Town' ? 2 : 1;
    props.getAllRooms(hotel_id,userEmail ?? email).then(() => {

    });
  }

  useEffect(() => {

    setRooms(props.app.allRooms)

  }, [props.app.allRooms]);

  return (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: marginLeft ? marginLeft : undefined,
      }}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={3}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={rooms}
        renderItem={({ item }) => {
          console.log('nmnmnm', roomException, item.id)
          return (
            roomException != item.id && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ marginRight: RFValue(6) }}
                key={Math.random()}
                onPress={() => {
                  if(roomException!=0){
                    navigation.replace(Routes.RoomDetail, { room: item })
                  }else{
                    navigation.push(Routes.RoomDetail, { room: item })
                  }
                  
                }
                }
              >
                <FastImage
                  source={{ uri: item.feature_image }}
                  style={{
                    height: RFValue(280),
                    width: RFValue(280),
                  }}
                  resizeMode={'cover'}
                />
                <View
                  style={{
                    ...styles.bottomTextContainer,
                    backgroundColor: Themes[props.app.branch],
                  }}>
                  <Text style={styles.bottomText}>{item.aptr_name}</Text>
                </View>
              </TouchableOpacity>
            )
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { getRooms, getAllRooms };

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);

const styles = StyleSheet.create({
  bottomTextContainer: {
    bottom: RFValue(40),
    opacity: 0.87,
    height: RFValue(40),
    justifyContent: 'center',
  },

  bottomText: {
    fontFamily: PFregular,
    fontSize: RFValue(17),
    marginLeft: RFValue(7),
    color: 'rgb(255,255,255)',
  },
});
