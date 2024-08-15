import React, { useEffect, useState, useRef } from 'react';
import { View, StatusBar, Platform, ActivityIndicator, Text } from 'react-native';
// eslint-disable-next-line prettier/prettier
import { RFValue } from 'react-native-responsive-fontsize';
import { WebView } from 'react-native-webview';
import HeaderWebView from '../components/HeaderWebView';
import Routes from '../navigations/Routes';
import API from '../utils/API';
import WhatsappFloating from '../components/WhatsappFloating';
// eslint-disable-next-line no-undef
export default WebViewScreen = (props) => {

  const { checkIn, checkOut, total } = props.route.params;
  const webviewRef = useRef(null);
  const [url, setUrl] = useState('')
  const [currentUrl, setCurrentUrl] = useState('');

  const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;
  console.log('Current url.....', props.route.params, API.getBranch());

  useEffect(() => {

    if (Platform.OS === 'android') {
      StatusBar.setHidden(true);
    }
    if (props.route.params.isPayment) {
      props.navigation.setOptions({ title: 'Payment' });
    }
  }, [props.navigation, props.route.params.isPayment]);
  useEffect(() => {
    setUrlAccordingToBranch()

  }, [API.getBranch()]);
  const setUrlAccordingToBranch = () => {
    let propsUrl = props.route.params.url;
    if (propsUrl.includes('johar-town')) {
      console.log('chala0')
      setUrl(propsUrl.replace("johar-town", API.getBranch()));
    } else if (propsUrl.includes('gulberg')) {
      console.log('chala1')
      setUrl(propsUrl.replace("gulberg", API.getBranch()))
    } else {
      console.log('chala2')
      setUrl(propsUrl);
    }
  }
  useEffect(() => {
    if (currentUrl.includes('success')) {
      let bookingId = currentUrl.substr(currentUrl.length - 7);
      props.navigation.replace(Routes.BookingCompletedScreen, {
        bookingNumber: bookingId,
        checkIn,
        checkOut,
        status: 'confirmed',
        total,
      });
    } else if (currentUrl.includes('failed')) {
      alert('Something went wrong, Please try again.');
      props.navigation.goBack();
    }
  }, [checkIn, checkOut, currentUrl, props.navigation, total]);

  return (
    <>
    <WhatsappFloating/>
      {!props.route.params.isPayment && <HeaderWebView title={props.route.name} isBackButtonEnabled={(url != currentUrl) ? true : false} onPressBackButton={webviewRef?.current?.goBack} />}
      <WebView
        style={{ marginTop: RFValue(20) }}
        source={{ uri: url }}
        setBuiltinZoomControls={true}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        scrollEnabled={true}
        nestedScrollEnabled={false}
        scalesPageToFit={false}
        bounces={false}
        startInLoadingState={true}
        showsHorizontalScrollIndicator={false}
        renderLoading={() => (
          <ActivityIndicator color="black" size="large" style={{ flex: 1 }} />
        )}
        ref={webviewRef}
        onNavigationStateChange={(navState) => {

          setCurrentUrl(navState.url);
        }}
      />
    </>
  );
};
