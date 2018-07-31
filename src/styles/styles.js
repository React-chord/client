import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22262d',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  headlineContainer: {
    backgroundColor: '#000',
    borderColor: 'transparent',
  },
  headlineText: {
    color: '#fff',
  },
  formText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
  },
  formTextInput: {
    color: '#000',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
  },
  formTextContainer: {
    backgroundColor: '#fff',
    opacity: 0.2,
    marginBottom: 5,
    height: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default styles;
