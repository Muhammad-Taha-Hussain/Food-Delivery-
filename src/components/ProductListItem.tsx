import { StyleSheet, Image, View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

import { Product } from "@/types";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    
    <Link href={`/(tabs)/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
      <Image
        source={{
          uri: product.image || "FoodOrderingsrcassetsimagesadaptive-icon.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>$ {product.price}</Text>
    </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    flex: 1,
    maxWidth: '50%',
    marginVertical: 10,
    marginHorizontal:10
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
