import FastImage from 'react-native-fast-image';
const  Image = ({source,resizeMode,...props}) => {
    return (
        <FastImage source={{uri:source.uri}} {...props} resizeMode={resizeMode} />
    );
  };
  export default Image;