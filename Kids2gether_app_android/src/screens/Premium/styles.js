import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 25
      },
      screen_title: {
        fontFamily: 'FredokaOne',
        fontSize: 18,
        margin: 1
      },
      align_text_content: {
        gap: 10,
        margin: 30
      },
      align_text: {
        flexDirection: 'row',
        gap: 15,
      },
      content_text: {
        fontFamily: 'FredokaOne',
        fontSize: 18,
      },
      align_list: {
        marginHorizontal: 5
      },
      align_card: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#FDc72e',
        borderRadius: 10,
        gap: 15,
        width: 250,
        height: 300,
        padding: 20
      },
      card_header: {
        color: "#fff",
        fontSize: 18,
        fontFamily: 'FredokaOne'
      },
      align_price: {
        fontFamily: 'FredokaOne',
        color: "#fff",
        fontSize: 18,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      },
      card_price: {
        fontFamily: 'FredokaOne',
        fontSize: 70
      },
      card_btn: {
        backgroundColor: "#327fb3"
      }
})