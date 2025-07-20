import * as React from "react";
import * as RN from "react-native";

export default function EWallet() {
    const [balance, setBalance] = React.useState(1000);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isGatewayVisible, setIsGatewayVisible] = React.useState(false);
    const [topupAmount, setTopupAmount] = React.useState("");
    const [selectedGateway, setSelectedGateway] = React.useState("");
    const [transactions, setTransactions] = React.useState([
        { id: "1", type: "Deposit", amount: 500, date: "March 14, 2025", gateway: "GCash" },
    ]);

    // Proceed to payment gateway selection
    const handleProceedPayment = () => {
        if (!topupAmount || parseFloat(topupAmount) <= 0) return;
        setIsModalVisible(false);
        setIsGatewayVisible(true);
    };

    // Handle final confirmation after selecting a payment method
    const handleConfirmPayment = () => {
        if (selectedGateway) {
            const amount = parseFloat(topupAmount);
            setBalance((prevBalance) => prevBalance + amount);
            setTransactions((prevTransactions) => [
                { id: Date.now().toString(), type: "Deposit", amount, date: "Just now", gateway: selectedGateway },
                ...prevTransactions,
            ]);
        }
        setIsGatewayVisible(false);
        setTopupAmount("");
        setSelectedGateway("");
    };

    return (
        <RN.View style={styles.screen}>
            <RN.Text style={styles.title}>E-Wallet</RN.Text>

            {/* Balance Section */}
            <RN.View style={styles.balanceContainer}>
                <RN.Text style={styles.balanceLabel}>Current Balance</RN.Text>
                <RN.Text style={styles.balance}>₱{balance.toFixed(2)}</RN.Text>
                <RN.TouchableOpacity style={styles.topupButton} onPress={() => setIsModalVisible(true)} activeOpacity={0.8}>
                    <RN.Text style={styles.topupText}>Deposit</RN.Text>
                </RN.TouchableOpacity>
            </RN.View>

            {/* Transaction History */}
            <RN.Text style={styles.historyTitle}>Transaction History</RN.Text>
            <RN.FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <RN.View style={styles.transactionItem}>
                        <RN.View>
                            <RN.Text style={styles.transactionType}>{item.type}</RN.Text>
                            {item.gateway && (
                                <RN.Text style={styles.transactionGateway}>via {item.gateway}</RN.Text>
                            )}
                        </RN.View>
                        <RN.Text style={[styles.transactionAmount, item.amount < 0 ? styles.negative : styles.positive]}>
                            {item.amount < 0 ? "-" : "+"}₱{Math.abs(item.amount).toFixed(2)}
                        </RN.Text>
                        <RN.Text style={styles.transactionDate}>{item.date}</RN.Text>
                    </RN.View>
                )}
            />

            {/* Amount Input Modal */}
            <RN.Modal visible={isModalVisible} transparent animationType="slide">
                <RN.View style={styles.modalBackground}>
                    <RN.View style={styles.modalContainer}>
                        <RN.Text style={styles.modalTitle}>Enter Amount to Deposit</RN.Text>
                        <RN.TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="₱0.00"
                            value={topupAmount}
                            onChangeText={setTopupAmount}
                        />
                        <RN.View style={styles.modalButtons}>
                            <RN.TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)} activeOpacity={0.8}>
                                <RN.Text style={styles.buttonText}>Cancel</RN.Text>
                            </RN.TouchableOpacity>
                            <RN.TouchableOpacity style={styles.confirmButton} onPress={handleProceedPayment} activeOpacity={0.8}>
                                <RN.Text style={styles.buttonText}>Proceed</RN.Text>
                            </RN.TouchableOpacity>
                        </RN.View>
                    </RN.View>
                </RN.View>
            </RN.Modal>

            {/* Payment Gateway Selection Modal */}
            <RN.Modal visible={isGatewayVisible} transparent animationType="slide">
                <RN.View style={styles.modalBackground}>
                    <RN.View style={styles.modalContainer}>
                        <RN.Text style={styles.modalTitle}>Select Payment Method</RN.Text>
                        <RN.TouchableOpacity style={styles.gatewayButton} onPress={() => setSelectedGateway("GCash")}>
                            <RN.Text style={styles.gatewayText}>GCash</RN.Text>
                        </RN.TouchableOpacity>
                        <RN.View style={styles.modalButtons}>
                            <RN.TouchableOpacity style={styles.cancelButton} onPress={() => setIsGatewayVisible(false)}>
                                <RN.Text style={styles.buttonText}>Cancel</RN.Text>
                            </RN.TouchableOpacity>
                            <RN.TouchableOpacity
                                style={[styles.confirmButton, !selectedGateway && { opacity: 0.5 }]}
                                onPress={handleConfirmPayment}
                                disabled={!selectedGateway}
                            >
                                <RN.Text style={styles.buttonText}>Confirm</RN.Text>
                            </RN.TouchableOpacity>
                        </RN.View>
                    </RN.View>
                </RN.View>
            </RN.Modal>
        </RN.View>
    );
}

// Styles
const styles = RN.StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 30 },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    balanceContainer: { backgroundColor: "#337B09", padding: 20, borderRadius: 10, alignItems: "center", marginBottom: 20 },
    balanceLabel: { fontSize: 16, color: "#fff" },
    balance: { fontSize: 28, fontWeight: "bold", color: "#fff", marginVertical: 10 },
    topupButton: { backgroundColor: "#fff", padding: 10, borderRadius: 5 },
    topupText: { fontSize: 16, color: "#337B09", fontWeight: "bold" },
    historyTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    transactionItem: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#F5F5F5", padding: 15, borderRadius: 10, marginBottom: 10 },
    transactionType: { fontSize: 16, fontWeight: "bold" },
    transactionGateway: { fontSize: 14, color: "#555", fontStyle: "italic" },
    transactionAmount: { fontSize: 16, fontWeight: "bold" },
    positive: { color: "green" },
    negative: { color: "red" },
    transactionDate: { fontSize: 12, color: "#777" },
    modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, fontSize: 16, marginBottom: 10, textAlign: "center" },
    modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
    cancelButton: { flex: 1, padding: 10, backgroundColor: "#ccc", borderRadius: 5, alignItems: "center", marginRight: 5 },
    confirmButton: { flex: 1, padding: 10, backgroundColor: "#337B09", borderRadius: 5, alignItems: "center", marginLeft: 5 },
    buttonText: { color: "#fff", fontWeight: "bold" },
    gatewayButton: { padding: 15, backgroundColor: "#EFEFEF", borderRadius: 5, width: "100%", alignItems: "center", marginVertical: 5 },
    gatewayText: { fontSize: 16, fontWeight: "bold" },
});

