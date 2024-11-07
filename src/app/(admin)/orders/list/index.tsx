import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import OrderListItem from '@/components/OrderListItem'
import { useadminOrderList } from '@/api/orders'
import { useInsertOrderSubscription } from '@/api/orders/subscriptions'



const OrderScreen = () => {
  
  const {data: orders, isLoading, error} = useadminOrderList({archieved: false});
  
  useInsertOrderSubscription();

  if(isLoading) {
    return <ActivityIndicator />
  }

  if(error) {
    return <Text>Failed to Fetch</Text>
  }

  return (
    <View>
      <FlatList 
          data={orders}
          renderItem={ ( {item} ) => <OrderListItem order={item} /> }
          numColumns={1}
          contentContainerStyle= {{ gap:10, padding: 10 }}
          
          // columnWrapperStyle= {{ gap:10 }}
          // refreshing= {refresh}
          // onRefresh={setRefresh(true)}
        />
    </View>
  )
}

export default OrderScreen