import {View, Text} from 'react-native';

const Twit = ({username, content}) => {
  return (
    <View style={styles.twit}>
      <Text style={styles.userTwit}>{username}</Text>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
}

export default Twit;