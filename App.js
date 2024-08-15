import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './app/containers/AppNavigation';
import {
  getActiveRouteName,
  onNavigationStateChange,
} from './app/helpers/NavigationMiddleware';
import { navigationRef } from './app/navigations/RootNavigation';
import STORE from './app/store';
// import messaging from '@react-native-firebase/messaging';
import DraggableView from 'react-native-draggable-reanimated';
import { LogBox, SafeAreaView, Text } from 'react-native';
import WhatsappFloating from './app/components/WhatsappFloating';

const App = () => {
  const routeNameRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();
    routeNameRef.current = getActiveRouteName(state);
    LogBox.ignoreAllLogs(true);
    // (async () => {
    //   await requestUserPermission();

    //   messaging().onMessage((notif) => {
    //     (async () => {
    //       const channelId = await notifee.createChannel({
    //         id: 'default',
    //         name: 'Default Channel',
    //       });
    //       await notifee.displayNotification({
    //         title: notif.notification.title,
    //         body: notif.notification.body,
    //         android: {
    //           channelId,
    //         },
    //       });
    //     })();
    //   });
    // })();
  }, []);

  const requestUserPermission = async () => {
    await messaging().requestPermission();
  };

  return (
    <Provider store={STORE}>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={(state) => onNavigationStateChange(state, routeNameRef)}>
        <AppNavigation />
       
      </NavigationContainer>
    </Provider>
  );
};

export default App;
