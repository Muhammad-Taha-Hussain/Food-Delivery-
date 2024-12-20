import { Image, StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";

import { PizzaSize, Product } from "@/types";
import Button from "@/components/Button";
// import products from "@/assets/data/Products";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useCart } from "@/providers/CartProvider";
import { useProduct } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";
import { defaultPizzaImage } from "@/components/ProductListItem";


const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const [selectedSize, setSelectedsize] = useState<PizzaSize>("M");
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const {data: product, error, isLoading} = useProduct(id); 


  const router = useRouter();

  const { addItem } = useCart();

  // const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if(!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart')
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch data products</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage
        path={product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"

      />
      <Text>Select Size</Text>

      <View style={styles.sizes}>
        {sizes.map((size, id) => (
          <Pressable
            onPress={() => setSelectedsize(size)}
            key={id}
            style={[
              styles.size,
              {
                backgroundColor:
                  selectedSize === size ? "gainsboro" : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === size ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text>Price:</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to Cart" />
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
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  price: {
    color: Colors.light.tint,
    paddingHorizontal: 10,
    fontSize: 20,
    marginTop: "auto",
    fontWeight: "bold",
  },
});
