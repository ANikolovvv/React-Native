import { View, StyleSheet, Alert } from "react-native";
import OutlinedButon from "../UI/OutlinedButton";

import { Colors } from "../../constans/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

function LocationPicker({}) {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const location = getCurrentPositionAsync({});
    console.log(location);
  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.map}></View>
      <View style={styles.action}>
        <OutlinedButon icon={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlinedButon>
        <OutlinedButon icon={"map"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButon>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
