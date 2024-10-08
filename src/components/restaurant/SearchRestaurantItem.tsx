import { View, Text } from "react-native";

export function SearchRestaurantItem({ searchText, data }) {
    return (
        <View style={{ marginLeft: 10, fontWeight: "600", }}>
            <Text>Search results for:{searchText}</Text>
        </View>
    );
}