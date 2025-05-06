
import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { Filter, Search } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';
import { MOCK_BIKES } from '@/constants/mockData';
import { BikeCard } from '@/components/marketplace/BikeCard';

export default function MarketplaceScreen() {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBikes, setFilteredBikes] = useState(MOCK_BIKES);

  // Filter bikes based on search query
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!text) {
      setFilteredBikes(MOCK_BIKES);
      return;
    }

    const filtered = MOCK_BIKES.filter(bike =>
      bike.name.toLowerCase().includes(text.toLowerCase()) ||
      bike.brand.toLowerCase().includes(text.toLowerCase()) ||
      bike.type.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredBikes(filtered);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color='#71717A' style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bikes by name.."
            placeholderTextColor='#71717A'
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Filter button (non-functional in MVP) */}
        <View style={styles.filterButton}>
          <Filter size={20} color={'#3F3F46'} />
        </View>
      </View>

      <FlatList
        style={styles.bikeList}
        contentContainerStyle={styles.bikeListContent}
        data={filteredBikes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.title}>Available Electric Bikes</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No bikes found matching your search.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <BikeCard
            id={item.id}
            name={item.name}
            image={item.image}
            brand={item.brand}
            type={item.type as "cargo" | "passenger" | "delivery" | "standard"}
            price={item.price}
            range={item.range}
            availability={item.availability as 'available' | 'limited' | 'unavailable'}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#E4E4E7',
    borderBottomWidth: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#27272A',
  },
  filterButton: {
    marginLeft: 12,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E4E4E7',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
  },
  bikeList: {
    flex: 1,
  },
  bikeListContent: {
    padding: 16,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#52525B',
    textAlign: 'center',
  },
});
