import { useMachine } from "@xstate/react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { stateMachine } from "./src/machines/stateMachine";

const isValidEvent = (e: string) => {
  return !isNaN(Number(e));
};

export default function App() {
  const [{ context }, send] = useMachine(stateMachine);
  return (
    <View style={styles.container}>
      <Text>Temperature converter</Text>
      <View style={styles.field}>
        <Text>Celsius</Text>
        <TextInput
          keyboardType="numeric"
          onChange={(event) => {
            if (isValidEvent(event.nativeEvent.text)) {
              send("CHANGE_CELSIUS", {
                value: event.nativeEvent.text,
              });
            }
          }}
          value={context.celsius}
        />
      </View>
      <View style={styles.field}>
        <Text>Fahrenheit</Text>
        <TextInput
          keyboardType="numeric"
          value={context.fahrenheit}
          onChange={(event) => {
            if (isValidEvent(event.nativeEvent.text)) {
              send("CHANGE_FAHRENHEIT", {
                value: event.nativeEvent.text,
              });
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
