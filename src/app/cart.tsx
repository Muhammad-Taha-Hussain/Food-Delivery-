import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react' 

import { useCart } from "@/providers/CartProvider"
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

export default function CartScreen() {

  const { items, total } = useCart();
  console.log(total);
  
  return (
    <View style={{ padding: 10 }}>
      <Text>Cart Items Length: {items.length} </Text>
      <FlatList 
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={ item } />}
        contentContainerStyle={{ gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>Total : ${total}</Text>
      { items.length>0 && 
      <Button text='Checkout' /> }
      

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}