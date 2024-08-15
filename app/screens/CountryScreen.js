/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {getCountries} from '../store/actions/AppActions';
import {connect} from 'react-redux';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import {Themes} from '../store/utils/branchData';
import AppTheme from '../styles/AppTheme';

const {OSregular} = AppTheme.fonts;

const CountryScreen = ({route, navigation, ...props}) => {
  // const [searchQuery, setSearchQuery] = React.useState('');

  const onPress = (code, name) => {
    route.params.setFieldValue('country', code + '+++' + name);
    navigation.goBack();
  };

  useEffect(() => {
    props.getCountries();
  }, []);

  let keys = Object.keys(props.app.countries?.data?.country || []);
  /* console.log(keys); */
  /*   const values = Object.values(props.app.countries?.data?.country || {});
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    values.filter((item)=> item.startsWith(query));
  }; */

  return (
    <>
      {props.app.errorGetCountries && (
        <Text
          style={{
            color: 'red',
            fontFamily: OSregular,
            fontSize: RFValue(14),
            textAlign: 'center',
            paddingHorizontal: RFValue(15),
          }}>
          Cannot load Countries...Please check your internet connection!
        </Text>
      )}

      {/*       <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{marginVertical: 20}}
      /> */}

      <FlatList
        ListHeaderComponent={() =>
          props.app.loadingGetCountries ? (
            <ActivityIndicator
              color={Themes[props.app.branch]}
              size={RFValue(32)}
              style={{marginVertical: RFValue(5)}}
            />
          ) : null
        }
        keyExtractor={(item, index) => index.toString()}
        data={keys}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              onPress(
                keys[index],
                props.app.countries?.data?.country[keys[index]],
              )
            }
            style={{
              padding: RFValue(15),
              borderWidth: 0.5,
              borderColor: '#aaa',
            }}>
            <Text style={{fontSize: RFValue(14), alignSelf: 'center'}}>
              {props.app.countries?.data?.country[keys[index]]}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profileReducer,
  app: state.appReducer,
});

const mapDispatchToProps = {getCountries};

export default connect(mapStateToProps, mapDispatchToProps)(CountryScreen);

/* const styles = StyleSheet.create({}); */
