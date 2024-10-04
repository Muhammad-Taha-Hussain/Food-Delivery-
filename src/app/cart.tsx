import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react' 

import { useCart } from "@/providers/CartProvider"
import CartListItem from '@/components/CartListItem';

export default function CartScreen() {

  const { items } = useCart();

  return (
    <View>
      <Text>Cart Items Length: {items.length} </Text>
      <FlatList 
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={ item } />}
      />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}