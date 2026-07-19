import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";

const Colors = {
  primary: '#3B82F6', // Blue color used in the design
  background: '#F9FAFB', 
  card: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  cyan: '#06B6D4',
};

const ProductCard = ({ title, subtitle, capacity, read, write, score, price, badgeType, badgeText, imageUrl }) => (
  <View style={styles.cardContainer}>
    <View style={styles.imageContainer}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.productImage} resizeMode="cover" />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>SSD Image</Text>
        </View>
      )}
      {badgeType === 'new' && (
        <View style={styles.badgeNew}>
          <Text style={styles.badgeNewText}>{badgeText}</Text>
        </View>
      )}
      {badgeType === 'bestseller' && (
        <View style={styles.badgeBest}>
          <Text style={styles.badgeBestText}>{badgeText}</Text>
        </View>
      )}
    </View>

    <View style={styles.cardBody}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>

      <View style={styles.specsContainer}>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Capacity</Text>
          <Text style={styles.specValue}>{capacity}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Read Speed</Text>
          <Text style={styles.specValue}>{read}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Write Speed</Text>
          <Text style={styles.specValue}>{write}</Text>
        </View>
      </View>

      <View style={styles.performanceContainer}>
        <View style={styles.perfHeader}>
          <Text style={styles.specLabel}>Performance Index</Text>
          <Text style={styles.perfScore}>{score}</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '98%' }]} />
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.price}>{price}</Text>
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.cartIcon}>🛒</Text>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function HomeScreen() {
  const [activeTag, setActiveTag] = useState('All Drives');
  const [productsData, setProductsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const tags = ['All Drives', 'NVMe Gen5', 'NVMe Gen4', 'SATA SSD'];

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Arnat-Mueansudjai/MyApp_by_Arnat/refs/heads/master/constants/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CUTE BOY SHOP</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Solid State Drives</Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search models, specs..."
            placeholderTextColor={Colors.textSecondary}
          />
        </View>

        {/* Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScroll} contentContainerStyle={styles.tagsContainer}>
          {tags.map((tag) => (
            <TouchableOpacity 
              key={tag} 
              style={[styles.tag, activeTag === tag && styles.activeTag]}
              onPress={() => setActiveTag(tag)}
            >
              <Text style={[styles.tagText, activeTag === tag && styles.activeTagText]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Cards */}
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
        ) : (
          productsData.map((product) => (
            <ProductCard 
              key={product.id}
              title={product.title}
              subtitle={product.subtitle}
              capacity={product.capacity}
              read={product.read}
              write={product.write}
              score={product.score}
              price={product.price}
              badgeType={product.badgeType}
              badgeText={product.badgeText}
              imageUrl={product.imageUrl}
            />
          ))
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, { color: Colors.primary }]}>🛍️</Text>
          <Text style={[styles.navText, { color: Colors.primary }]}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
  },
  menuIcon: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.primary,
    letterSpacing: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.card,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  tagsScroll: {
    marginBottom: 20,
  },
  tagsContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    marginRight: 10,
  },
  activeTag: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tagText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  activeTagText: {
    color: "#FFFFFF",
  },
  cardContainer: {
    backgroundColor: Colors.card,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  imageContainer: {
    height: 180,
    backgroundColor: '#374151',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D3748', // Dark background like in design
  },
  placeholderText: {
    color: '#A0AEC0',
    fontSize: 16,
  },
  badgeNew: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
  },
  badgeNewText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgeBest: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#D1D5DB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
  },
  badgeBestText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  specsContainer: {
    marginBottom: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  specLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  specValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  performanceContainer: {
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  perfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  perfScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.cyan,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.cyan,
    borderRadius: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  addToCartBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 16,
    color: 'white',
    marginRight: 6,
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navIcon: {
    fontSize: 20,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: "500",
  },
});
