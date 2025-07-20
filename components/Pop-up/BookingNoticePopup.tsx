import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  visible: boolean;
  onTopUp: () => void;
  onClose: () => void;
};

const BookingNoticePopup: React.FC<Props> = ({ visible, onTopUp, onClose }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Important Notice Before Booking</Text>

          <Text style={styles.sectionTitle}>Tryke-Moto Requires Tokens for Booking</Text>
          <Text style={styles.paragraph}>Before you can book a ride, please ensure you have enough Tryke-Moto Tokens (TMT) in your wallet.
          </Text>

          <Text style={styles.sectionTitle}>Available Payment Methods:</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Cash</Text> – Pay the booking fee using TMT, then pay the remaining fare in cash.{"\n"}
            <Text style={styles.bold}>E-Wallet (TMT)</Text> – Pay the full fare using Tryke-Moto Tokens.
          </Text>

          <Text style={styles.sectionTitle}>Important Reminders:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• The booking fee is non-refundable once a driver accepts your request.</Text>
            <Text style={styles.bullet}>• If your TMT balance is low, top up now to avoid booking issues.</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.outlinedButton} onPress={onTopUp}>
              <Text style={styles.outlinedText}>TOP UP NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.solidButton} onPress={onClose}>
              <Text style={styles.solidText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BookingNoticePopup;




const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'PoppinsBold',
  },
  sectionTitle: {
    fontSize: 14,
    paddingTop: 15,
    fontFamily: 'PoppinsBold',
  },
  paragraph: {
    fontSize: 12,
    color: "#333",
    lineHeight: 20,
    fontFamily: 'Poppins',
  },
  bold: {
    fontFamily: 'PoppinsSemiBold',
  },
  bulletList: {
    marginTop: 4,
  },
  bullet: {
    fontSize: 12,
    color: "#333",
    fontFamily: 'Poppins',
  },
  buttonGroup: {
    marginTop: 20,
  },
  outlinedButton: {
    borderWidth: 1.5,
    borderColor: "#337B09",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  outlinedText: {
    color: "#337B09",
    fontWeight: "bold",
    fontFamily: 'Poppins',
  },
  solidButton: {
    backgroundColor: "#337B09",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  solidText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: 'Poppins',
  },
});
