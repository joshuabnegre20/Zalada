import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * SmartShop Home Screen
 * - FlatList for products
 * - Search + category + price-band filters
 * - Add to cart & persist with AsyncStorage
 *
 * Save as SmartShopHome.js and import into your navigator/App entry.
 */

const CART_STORAGE_KEY = '@smartshop_cart_v1';

// Sample product data (for demo — replace/add your real data)
const SAMPLE_PRODUCTS = [
  {
    id: 'p1',
    name: 'Classic Leather Wallet',
    description: 'Genuine leather, compact design, multiple card slots.',
    price: 499,
    category: 'Accessories',
    image: 'https://picsum.photos/id/1011/400/300',
  },
  {
    id: 'p2',
    name: 'Canvas Tote Bag',
    description: 'Durable canvas bag, perfect for everyday use.',
    price: 350,
    category: 'Bags',
    image: 'https://picsum.photos/id/1005/400/300',
  },
  {
    id: 'p3',
    name: 'Sport Sneakers',
    description: 'Lightweight and breathable running sneakers.',
    price: 1299,
    category: 'Shoes',
    image: 'https://picsum.photos/id/1027/400/300',
  },
  {
    id: 'p4',
    name: 'Minimalist Watch',
    description: 'Slim profile watch with leather strap.',
    price: 1999,
    category: 'Accessories',
    image: 'https://picsum.photos/id/1025/400/300',
  },
  {
    id: 'p5',
    name: 'Ceramic Coffee Mug',
    description: '350ml ceramic mug, dishwasher-safe.',
    price: 199,
    category: 'Home',
    image: 'https://picsum.photos/id/1060/400/300',
  },
  {
    id: 'p6',
    name: 'Wireless Earbuds',
    description: 'Noise isolating, long battery life.',
    price: 899,
    category: 'Electronics',
    image: 'https://picsum.photos/id/180/400/300',
  },
  {
    id: 'p7',
    name: 'Pocket Notebook',
    description: 'A6 notebook with 120 lined pages.',
    price: 129,
    category: 'Stationery',
    image: 'https://picsum.photos/id/1020/400/300',
  },
];

export default function SmartShopHome() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All'); // All, Below500, AboveOrEqual500
  const [cart, setCart] = useState({}); // { productId: { ...product, qty } }
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingCart, setLoadingCart] = useState(true);

  // Extract categories from products
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    // save cart whenever changed (debounce could be added for optimization)
    saveCartToStorage(cart);
  }, [cart]);

  async function loadCartFromStorage() {
    try {
      setLoadingCart(true);
      const raw = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setCart(parsed);
      }
    } catch (err) {
      console.warn('Failed loading cart', err);
    } finally {
      setLoadingCart(false);
    }
  }

  async function saveCartToStorage(newCart) {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    } catch (err) {
      console.warn('Failed saving cart', err);
    }
  }

  function addToCart(product) {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[product.id]) {
        copy[product.id].qty += 1;
      } else {
        copy[product.id] = { ...product, qty: 1 };
      }
      return copy;
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => {
      const copy = { ...prev };
      if (!copy[productId]) return prev;
      if (copy[productId].qty > 1) {
        copy[productId].qty -= 1;
      } else {
        delete copy[productId];
      }
      return copy;
    });
  }

  function clearCart() {
    Alert.alert('Clear Cart', 'Are you sure you want to remove all items from cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => setCart({}),
      },
    ]);
  }

  function cartItemCount() {
    return Object.values(cart).reduce((s, item) => s + (item.qty || 0), 0);
  }

  function cartSubtotal() {
    return Object.values(cart).reduce((s, item) => s + item.qty * item.price, 0);
  }

  // Filtering logic
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (priceFilter === 'Below500' && p.price >= 500) return false;
      if (priceFilter === 'AboveOrEqual500' && p.price < 500) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [products, query, selectedCategory, priceFilter]);

  function handleCheckout() {
    if (cartItemCount() === 0) {
      Alert.alert('Cart Empty', 'Add some products to the cart before checking out.');
      return;
    }
    // Placeholder: implement real checkout flow (payment, order creation)
    Alert.alert(
      'Checkout',
      `Order placed! Total: ₱${cartSubtotal().toFixed(2)}\n(Checkout flow not implemented in demo.)`
    );
    setCart({});
    setModalVisible(false);
  }

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
        onError={() => {
          // Image fallback: do nothing — remote placeholder may occasionally fail
        }}
      />
      <View style={styles.cardBody}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDesc} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.rowBetween}>
          <Text style={styles.price}>₱{item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => addToCart(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // If still loading cart from storage, show a brief loader
  if (loadingCart) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 12 }}>Loading cart…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SmartShop</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.cartText}>Cart</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItemCount()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search products, categories..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersRow}>
        <View style={styles.categories}>
          <ScrollCategories
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </View>
        <View style={styles.priceFilters}>
          <FilterButton
            label="All"
            active={priceFilter === 'All'}
            onPress={() => setPriceFilter('All')}
          />
          <FilterButton
            label="< ₱500"
            active={priceFilter === 'Below500'}
            onPress={() => setPriceFilter('Below500')}
          />
          <FilterButton
            label="≥ ₱500"
            active={priceFilter === 'AboveOrEqual500'}
            onPress={() => setPriceFilter('AboveOrEqual500')}
          />
        </View>
      </View>

      {/* Product list */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No products match your search / filters.</Text>
          </View>
        }
      />

      {/* Order Summary Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Order Summary</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            {cartItemCount() === 0 ? (
              <View style={styles.emptyWrap}>
                <Text style={styles.emptyText}>Your cart is empty.</Text>
              </View>
            ) : (
              <FlatList
                data={Object.values(cart)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.cartRow}>
                    <Image source={{ uri: item.image }} style={styles.cartImage} />
                    <View style={styles.cartInfo}>
                      <Text style={styles.cartName}>{item.name}</Text>
                      <Text style={styles.cartQty}>Qty: {item.qty}</Text>
                      <Text style={styles.cartPrice}>₱{(item.price * item.qty).toFixed(2)}</Text>
                    </View>
                    <View style={styles.cartActions}>
                      <TouchableOpacity
                        style={styles.smallBtn}
                        onPress={() => addToCart(item)}
                      >
                        <Text style={styles.smallBtnText}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.smallBtn, { marginTop: 8 }]}
                        onPress={() => removeFromCart(item.id)}
                      >
                        <Text style={styles.smallBtnText}>−</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
          </View>

          <View style={styles.modalFooter}>
            <View>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalAmount}>₱{cartSubtotal().toFixed(2)}</Text>
            </View>
            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
                <Text style={styles.clearBtnText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

/* Small components */

function ScrollCategories({ categories, selected, onSelect }) {
  return (
    <View style={styles.categoryWrap}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(c) => c}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryBtn,
              item === selected ? styles.categoryBtnActive : null,
            ]}
            onPress={() => onSelect(item)}
          >
            <Text
              style={[
                styles.categoryText,
                item === selected ? styles.categoryTextActive : null,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function FilterButton({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.filterBtn, active ? styles.filterBtnActive : null]}
    >
      <Text style={[styles.filterBtnText, active ? styles.filterTextActive : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E3E6EA',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  cartText: {
    fontWeight: '600',
    marginRight: 8,
  },
  badge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },

  searchRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },

  filtersRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  categories: {
    marginBottom: 8,
  },
  priceFilters: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  filterBtnText: {
    fontSize: 13,
    color: '#374151',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },

  listContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  productImage: {
    width: 120,
    height: 120,
  },
  cardBody: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  productDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  addBtn: {
    backgroundColor: '#111827',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  emptyWrap: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#6B7280',
  },

  /* Modal */
  modalContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  modalClose: {
    color: '#2563EB',
    fontWeight: '700',
  },
  modalBody: {
    flex: 1,
    padding: 12,
  },
  cartRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
    marginVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  cartInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  cartName: {
    fontWeight: '700',
  },
  cartQty: {
    color: '#6B7280',
    marginTop: 4,
  },
  cartPrice: {
    marginTop: 6,
    fontWeight: '800',
    color: '#10B981',
  },
  cartActions: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },

  modalFooter: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: '#6B7280',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '800',
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
  },
  clearBtnText: {
    color: '#111827',
    fontWeight: '700',
  },
  checkoutBtn: {
    backgroundColor: '#111827',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '800',
  },

  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* categories */
  categoryWrap: {
    paddingBottom: 6,
  },
  categoryBtn: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  categoryBtnActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  categoryText: {
    color: '#374151',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
});
