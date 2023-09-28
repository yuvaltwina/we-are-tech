import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  modalView: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 30,
    gap: 15,
    flex: 1,
    alignItems: 'center',
    maxHeight: 450,
    minHeight: 450,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: '50%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },

  headline: { fontSize: 20, fontWeight: 'bold' },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 8,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: '30%',
    borderWidth: 1,
    borderColor: 'transparent',
  },

  buttonText: {
    fontSize: 10,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  selectedButtonIcon: {
    color: '#ffd700',
    position: 'absolute',
    top: -7,
    right: -7,
    fontSize: 17,
  },

  input: { width: '92%' },

  errorText: { color: 'red' },

  submitView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginTop: 'auto',
  },

  subHeadLine: {},
});
