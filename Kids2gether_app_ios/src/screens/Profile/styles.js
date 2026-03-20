import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  align_content: {
    width: '100%',
    alignItems: 'center'
  },
  page_title: {
    fontFamily: "FredokaOne",
    color: "#000",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  membership_content: {
    paddingTop: 40,
    width: '80%',
    gap: 20,
  },
  actions_button: {
    backgroundColor: '#FDB72E',
    padding: 15,
    width: '100%',
  },
  actions_text: {
    fontSize: 16,
    fontFamily: 'FredokaOne',
    textAlign: 'center',
    color: '#fff',
  },
  signin_content: {
    width: '80%',
    alignItems: 'center',
    gap: 20,
    marginBottom: 30
  },
});
