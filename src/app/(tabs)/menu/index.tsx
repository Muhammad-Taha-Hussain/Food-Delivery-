import { ScrollView, View, FlatList } from "react-native";

import orders from "@assets/data/Orders";
import products from "@assets/data/Products";

//Imported Components
import ProductListItem from "@components/ProductListItem";
import { useState } from "react";

export default function MenuScreen() {

  const [refersh, setRefresh ] = useState(false);
  return (
    <View>
        <FlatList 
          data={products}
          renderItem={ ( {item} ) => <ProductListItem product={item} /> }
          numColumns={2}

          
          // contentContainerStyle= {{ gap:10 }}
          // columnWrapperStyle= {{ gap:10 }}
          // refreshing= {refresh}
          // onRefresh={setRefresh(true)}
        />
    </View>
  );
}
