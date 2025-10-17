import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PRODUCTS = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 1299,
    description: "High-quality wireless headphones with deep bass.",
    image: "https://via.placeholder.com/150/00bfff/ffffff?text=Headphones",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 2499,
    description: "Track your health and notifications on the go.",
    image: "https://via.placeholder.com/150/ff1493/ffffff?text=Smart+Watch",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 999,
    description: "Portable mini speaker with strong bass.",
    image: "https://via.placeholder.com/150/32cd32/ffffff?text=Speaker",
  },
  {
    id: "4",
    name: "USB Flash Drive 64GB",
    price: 499,
    description: "High-speed data transfer flash drive.",
    image: "https://via.placeholder.com/150/f4a460/ffffff?text=USB+Drive",
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [viewCart, setViewCart] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    saveCart();
  }, [cart]);

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const loadCart = async () => {
    try {
      const data = await AsyncStorage.getItem("cart");
      if (data) setCart(JSON.parse(data));
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      Alert.alert("Already Added", `${product.name} is already in your cart.`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      Alert.alert("Added", `${product.name} added to cart!`);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛒 SmartShop</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setViewCart(!viewCart)}
        >
          <Text style={styles.cartText}>
            {viewCart ? "🛍️ Products" : `🛒 Cart (${cart.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      {!viewCart ? (
        <>
          <TextInput
            style={styles.search}
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
          />

          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>₱{item.price}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <View style={styles.cartContainer}>
          <Text style={styles.subtitle}>🛍️ Your Cart</Text>
          {cart.length === 0 ? (
            <Text style={styles.empty}>Your cart is empty.</Text>
          ) : (
            <>
              <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <Text style={styles.cartName}>{item.name}</Text>
                    <Text>₱{item.price}</Text>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Text style={styles.remove}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <Text style={styles.total}>Total: ₱{total}</Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => {
                  Alert.alert("Order Placed", "Thank you for your purchase!");
                  setCart([]);
                }}
              >
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#1e90ff",
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  cartButton: { backgroundColor: "#fff", padding: 5, borderRadius: 10 },
  cartText: { color: "#1e90ff", fontWeight: "bold" },
  search: {
    backgroundColor: "#f1f1f1",
    margin: 10,
    padding: 8,
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  image: { width: 150, height: 150, borderRadius: 10 },
  name: { fontWeight: "bold", marginTop: 10, fontSize: 16 },
  price: { color: "#1e90ff", fontSize: 16, fontWeight: "bold" },
  desc: { textAlign: "center", color: "#555", marginVertical: 5 },
  button: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  cartContainer: { flex: 1, padding: 15 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  empty: { textAlign: "center", color: "#777", marginTop: 20 },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cartName: { fontWeight: "bold" },
  remove: { color: "red" },
  total: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  checkoutButton: {
    backgroundColor: "#32cd32",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "bold" },
});
