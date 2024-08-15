import React, { useEffect } from 'react';
import { View } from 'react-native'
import Routes from '../navigations/Routes'
const TestScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.navigate(Routes.WebViewScreen)
    }, [])
    return (
        <View></View>
    )
}
export default TestScreen;