/* import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import ContactSheetContent from '../components/ContactSheetContent';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';

const {deviceWidth, deviceHeight} = AppTheme.metrics;

const ContactBottomSheet = ({ref}) => {
  const [show, setshow] = useState(false);
  return (
    <View>
      {show && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => ref.current.snapTo(1)}
        />
      )}
      <BottomSheet
        ref={ref}
        initialSnap={1}
        snapPoints={[RFPercentage(32), 0]}
        renderHeader={() => (
          <BottomSheetHeader title="Contact Details" refer={ref} />
        )}
        renderContent={() => <ContactSheetContent refer={ref} />}
        onOpenStart={() => setshow(true)}
        onCloseEnd={() => setshow(false)}
      />
    </View>
  );
};

export default ContactBottomSheet;

const styles = StyleSheet.create({
  backDrop: {
    backgroundColor: 'rgba(0,0,0,0.40)',
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
    zIndex: 3,
  },
});
 */
