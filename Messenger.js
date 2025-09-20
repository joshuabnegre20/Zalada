import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const contacts = [
  {
    id: "2",
    name: "Orapa",
    messages: [
      { text: "faye!", sender: "5:18 pm" },
      { text: "asaa ka!", sender: "5:21 pm" },
    ],
  },
  {
    id: "4",
    name: "Portes",
    messages: [
      { text: "faye", sender: "5:00 pm" },
      { text: "pa utanga kog 500 na ", sender: "5:05 pm" },
    ],
  },
];

export default function MessengerBot() {
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (active) {
      setMessages((prev) => ({
        ...prev,
        [active.id]: prev[active.id] || [...active.messages],
      }));
    }
  }, [active]);

  const send = () => {
    if (!input.trim() || !active) return;
    setMessages((prev) => ({
      ...prev,
      [active.id]: [...(prev[active.id] || []), { text: input, sender: "You" }],
    }));
    setInput("");
    scroll.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scroll.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MESSENGER BOT</Text>

      {/* contact list */}
      <ScrollView horizontal style={styles.contactRow}>
        {contacts.map((c) => (
          <TouchableOpacity key={c.id} onPress={() => setActive(c)} style={styles.contact}>
            <View style={[styles.circle, active?.id === c.id && styles.activeCircle]} />
            <Text>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* chat view */}
      {active && (
        <View style={styles.chatWrapper}>
          <Text style={styles.chatTitle}>{active.name}</Text>

          <ScrollView ref={scroll} style={styles.chatBox}>
            {(messages[active.id] || []).map((m, i) => (
              <View key={i} style={[styles.bubble, m.sender === "You" ? styles.you : styles.them]}>
                <Text>{m.text}</Text>
                <Text style={styles.sender}>{m.sender}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type..."
              value={input}
              onChangeText={setInput}
            />
            <Button title="Send" onPress={send} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, alignItems:  "center" , backgroundColor:"lightpink" },

  // Title spacing
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 12, marginTop: 40 },

  contactRow: { flexGrow: 0, marginBottom: 12 },
  contact: { alignItems: "center", marginRight: 12 },
  circle: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#ccc", marginBottom: 4 },
  activeCircle: { backgroundColor: "#87cefa" },

  // Bigger SQUARE chat box (250 x 250 is about 4.5x4.5 inches on many phones)
  chatWrapper: {
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 6,
    marginTop: 10,
  },
  chatTitle: { fontSize: 14, fontWeight: "600", marginBottom: 4, textAlign: "center" },
  chatBox: { flex: 1, padding: 2 },
  bubble: {
    padding: 4,
    marginVertical: 2,
    borderRadius: 6,
    maxWidth: "80%",
  },
  you: { alignSelf: "flex-end", backgroundColor: "#cde5ff" },
  them: { alignSelf: "flex-start", backgroundColor: "#eee" },
  sender: { fontSize: 10, color: "#666", textAlign: "right" },

  inputRow: { flexDirection: "row", marginTop: 4 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    marginRight: 4,
    borderRadius: 4,
    fontSize: 12,
  },
});