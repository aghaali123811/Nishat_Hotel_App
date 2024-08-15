import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import NotificationItem from '../components/NotificationItem';
import WhatsappBottom from '../components/WhatsappBottom';
import AppTheme from '../styles/AppTheme';
import {RFValue} from 'react-native-responsive-fontsize';

import {getNotifications} from '../store/actions/AppActions';
import {connect} from 'react-redux';

const {notificationHighlight} = AppTheme.colors;
const data = [
  {
    type: 'confirmation',
    timeStamp: 'Today',
    bgColor: notificationHighlight,
    text: 'Your booking has been confirmed from 5 Mar to 12 Mar 2020.',
  },
  {
    type: 'rewards',
    timeStamp: 'Yesterday',
    bgColor: 'white',
    text: 'You just unlock the Nishat rewards.',
  },
  {
    type: 'announcement',
    text: 'We almost booked! April is getting close and we have few rooms available. Book now before its too late.',
    timeStamp: 'Yesterday',
    bgColor: notificationHighlight,
  },
  {
    type: 'confirmation',
    timeStamp: 'Today',
    bgColor: 'white',
    text: 'Your booking has been confirmed from 24 Jan to 27 Jan 2020.',
  },
  {
    type: 'info',
    text: 'Welcome to the Nisht Hotel app! Book rooms, wellness and banquet hall and get latest deals on you bookings.',
    timeStamp: '2 Jan 2020',
    bgColor: 'white',
  },
];

const NotificationsScreen = (props) => {
  const [notifications, setNotifications] = useState([]);

  // console.log('USER', props.app);

  useEffect(() => {
    // console.log(props.app.user.user_id);
    props.getNotifications(props.app.user.user_id);
  }, []);

  useEffect(() => {
    setNotifications(props.app.notifications);
  }, [props.app.notifications]);

  return (
    <View style={{width: '100%', height: '100%', justifyContent: 'center'}}>
      <WhatsappBottom/>
      {props.app.loadingGetNotifications ? (
        <ActivityIndicator
          color="black"
          style={{width: '100%', height: '82%'}}
        />
      ) : notifications?.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <NotificationItem item={item} />}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24}}>No Notification</Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {getNotifications};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsScreen);

const styles = StyleSheet.create({});
