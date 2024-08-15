import React from 'react';
import { Linking, Dimensions, View, useWindowDimensions } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import DraggableView from 'react-native-draggable-reanimated';

const actions = [
  {
    text: "Johar Town Banquet Reservations",
    name: "923008540897",
    position: 1,
    buttonSize: 0

  },
  {
    text: "Johar Town Room Reservations",
    position: 2,
    name: '923008541237',
    buttonSize: 0
  },
  {
    text: "Gulberg Banquet Reservations",
    position: 3,
    name: '923321494937',
    buttonSize: 0
  },
  {
    text: "Gulberg Room Reservations",
    position: 4,
    name: '923349477774',
    buttonSize: 0
  }
];
const WhatsappBottom = () => {
  const { height, width } = useWindowDimensions();


  return (
    <FloatingAction
      actions={actions}
      iconWidth={60}
      iconHeight={60}
      floatingIcon={require('../assets/whatsapp.png')}
      onPressItem={name => {
        Linking.openURL(`whatsapp://send?text=hello&phone=${name}`)
      }}
    />
  );
};

export default WhatsappBottom;

