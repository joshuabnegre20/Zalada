import React, {useRef, useState} from 'react';
import {View, Text, Pressable, Animated, StyleSheet, ActivityIndicator} from 'react-native';

// ShopButton - reusable React Native button for an online shop
// Features:
// - Title, subtitle (e.g. price)
// - Optional small badge (e.g. "Sale" or quantity)
// - Press scale animation + ripple-like feedback using opacity
// - Disabled and loading states
// - Easy to customize via style props

export default function ShopButton({
  title = 'Add to Cart',
  subtitle = null, // e.g. "$12.99"
  onPress = () => {},
  badge = null, // e.g. 'SALE'
  loading = false,
  disabled = false,
  style = {},
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {toValue: 0.97, useNativeDriver: true}),
      Animated.timing(opacity, {toValue: 0.9, duration: 120, useNativeDriver: true}),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {toValue: 1, friction: 6, useNativeDriver: true}),
      Animated.timing(opacity, {toValue: 1, duration: 150, useNativeDriver: true}),
    ]).start();
  };

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={!isDisabled ? onPress : null}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityState={{disabled: isDisabled}}
      style={({pressed}) => [styles.wrapper, style, pressed && styles.pressed]}
    >
      <Animated.View
        style={[
          styles.button,
          {transform: [{scale}], opacity: opacity},
          isDisabled && styles.buttonDisabled,
        ]}
      >
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        <View style={styles.right}>
          {badge ? <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View> : null}

          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            // simple cart-like icon made with emoji (works cross-platform)
            <Text style={styles.icon}>🛒</Text>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'visible',
  },
  pressed: {},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#0f766e', // teal-ish primary
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
  },
  left: {
    flexDirection: 'column',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: '#e6fffa',
    fontSize: 12,
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 8,
    fontSize: 20,
  },
  badge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 8,
  },
  badgeText: {
    color: '#b91c1c',
    fontSize: 11,
    fontWeight: '700',
  },
});

// Usage example (place inside any screen):
// <ShopButton
//   title="Buy Now"
//   subtitle="$19.99"
//   badge="SALE"
//   onPress={() => console.log('buy')}
// />

// You can customize colors and fonts by passing a style prop or wrapping this
// component in a higher-order component that provides theme values.
