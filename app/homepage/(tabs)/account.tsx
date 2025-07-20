import * as React from "react";
import * as RN from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext"; // must expose user object

export default function Account() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/auth/signin");
  };

  if (!user) {
    return (
      <RN.View style={styles.screen}>
        <RN.ActivityIndicator size="large" color="#337B09" />
      </RN.View>
    );
  }

  return (
    <RN.View style={styles.screen}>
      {/* Profile Header */}
      <RN.View style={styles.profileCard}>
        <RN.View style={styles.profileLeft}>
          <RN.Image
            source={{
              uri: user.photoUrl || "https://avatar.iran.liara.run/public/24",
            }}
            style={styles.profileImage}
          />
        </RN.View>
        <RN.View style={styles.profileRight}>
          <RN.Text style={styles.profileName}>
            {user.firstName + " " + user.lastName || "No Name"}
          </RN.Text>
          <RN.Text style={styles.profileInfo}>{user.phoneNumber}</RN.Text>
        </RN.View>
      </RN.View>

      {/* Menu */}
      <RN.View style={styles.menuContainer}>
        <RN.View style={styles.logoContainer}>
          <MaterialIcons name="account-circle" size={50} color="#337B09" />
          <RN.Text style={styles.logoText}>My Account</RN.Text>
        </RN.View>

        <MenuItem icon="lock" text="Change Password" />
        <MenuItem icon="place" text="Saved Places" />
        <MenuItem icon="info" text="About Us" />

        <RN.TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <RN.Text style={styles.logoutText}>Logout</RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    </RN.View>
  );
}

function MenuItem({ icon, text }: { icon: string; text: string }) {
  return (
    <RN.TouchableOpacity style={styles.menuItem}>
      <MaterialIcons name={icon} size={24} color="#333" />
      <RN.Text style={styles.menuText}>{text}</RN.Text>
    </RN.TouchableOpacity>
  );
}

const styles = RN.StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  profileCard: {
    backgroundColor: "#337B09",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileLeft: {
    marginRight: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileRight: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  profileInfo: {
    fontSize: 14,
    color: "#ddd",
  },
  menuContainer: {
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#337B09",
    marginTop: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
