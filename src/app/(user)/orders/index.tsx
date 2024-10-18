import { View, Text, FlatList } from 'react-native'
import React from 'react'
import orders from '@/assets/data/Orders'
import OrderListItem from '@/components/OrderListItem'



const OrderScreen = () => {
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