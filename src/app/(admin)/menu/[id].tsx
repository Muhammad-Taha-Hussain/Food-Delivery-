import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";

import { PizzaSize, Product } from "@/types";
import ProductListItem from "@/components/ProductListItem";
import Button from "@/components/Button";
import products from "@/assets/data/Products";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useCart } from "@/providers/CartProvider";


const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const [selectedSize, setSelectedsize] = useState<PizzaSize>("M");
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { addItem } = useCart();

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if(!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart')
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{
          uri: product.image || "FoodOrderingsrcassetsimagesadaptive-icon.png",
        }}
        style={styles.image}
      />

      <Text style={styles.price}>${product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    color: Colors.light.tint,
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
