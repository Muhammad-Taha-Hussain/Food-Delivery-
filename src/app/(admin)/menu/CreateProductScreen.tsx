import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker"
import { Stack, useLocalSearchParams } from "expo-router";


const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const {id} = useLocalSearchParams();
  const isUpdating = !!id;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);

    if(!result.canceled) {
      setImage(result.assets[0].uri)
    }
    
  }


  const resetfield = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setError('');
    if (!name) {
      setError("Name is Required");
      return false;
    } 
    if (!price) {
      setError("Price is Required");
      return false;
    }
    if(isNaN(parseFloat(price))) {
      setError("Price is not a number")
      return false;
    }
    return true;
  };

  const onSubmit  = () => {
    if(isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  }

  const onCreate = () => {
    if(!validateInput()) {
      return;
    } else {
      console.warn("Creating product", name, price);
      resetfield();
    }
  };
  const onUpdate = () => {
    if(!validateInput()) {
      return;
    } else {
      console.warn("Updating product", name, price);
      resetfield();
    }
  };

  const onDelete = () => {
    console.warn("Deleting....");
  }

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancel"
      },
      {
        text: "Delete",
        style: 'destructive',
        onPress: onDelete
      }
  ]);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? "Update Product" : "Create Product!" }} />
      <Image source={{ uri: image || defaultPizzaImage}} style={ styles.image } />
      <Text onPress={pickImage} style= { styles.textButton}>Select Image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        style={styles.input}
        onChangeText={(e) => setName(e.toString())}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        value={price}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(e) => setPrice(e)}
      />
      <Text style={{ color: 'red' }}>{error}</Text>

      <Button text={isUpdating ? "Updating" : "Create"} onPress={ onSubmit } />
      {isUpdating && <Text onPress={confirmDelete} style={ styles.textButton }>Delete</Text>}
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: '60%',
    aspectRatio: 1,
    alignSelf: 'center'
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10
  },
  label: {
    color: "gray",
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    marginHorizontal: 10,
  },
});
