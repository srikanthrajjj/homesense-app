import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../components';
import { Colors, Typography, Spacing, Layout } from '../constants/theme';
import { FAQItem, FAQCategory } from '../types';
import { mockFAQItems } from '../utils/mockData';

const HelpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | 'all'>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleBack = () => {
    navigation.goBack();
  };

  const categories: { value: FAQCategory | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'All', icon: 'apps' },
    { value: 'setup', label: 'Setup', icon: 'construct' },
    { value: 'privacy', label: 'Privacy', icon: 'shield-checkmark' },
    { value: 'troubleshooting', label: 'Issues', icon: 'warning' },
    { value: 'features', label: 'Features', icon: 'star' },
  ];

  const getFilteredFAQs = () => {
    let filtered = mockFAQItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };



  const renderCategory = (category: typeof categories[0]) => (
    <TouchableOpacity
      key={category.value}
      style={[
        styles.categoryButton,
        selectedCategory === category.value && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(category.value)}
    >
      <Ionicons
        name={category.icon as any}
        size={20}
        color={selectedCategory === category.value ? Colors.white : Colors.gray600}
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === category.value && styles.categoryTextActive
      ]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  const renderFAQItem = ({ item }: { item: FAQItem }) => {
    const isExpanded = expandedItems.has(item.id);

    return (
      <Card style={styles.faqItem}>
        <TouchableOpacity
          style={styles.faqHeader}
          onPress={() => toggleExpanded(item.id)}
        >
          <Text style={styles.faqQuestion}>{item.question}</Text>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={Colors.gray600}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{item.answer}</Text>
            <View style={styles.faqTags}>
              {item.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support & FAQ</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.gray500} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search help topics..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.gray500}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.gray500} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => renderCategory(item)}
          keyExtractor={(item) => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* FAQ List */}
      <FlatList
        data={getFilteredFAQs()}
        renderItem={renderFAQItem}
        keyExtractor={(item) => item.id}
        style={styles.faqList}
        contentContainerStyle={styles.faqListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="help-circle-outline" size={48} color={Colors.gray400} />
            <Text style={styles.emptyText}>No help topics found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or category filter</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    padding: Layout.screenPadding,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.black,
  },
  categoriesContainer: {
    paddingBottom: Spacing.md,
  },
  categoriesList: {
    paddingHorizontal: Layout.screenPadding,
    gap: Spacing.sm,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: 20,
    gap: Spacing.xs,
  },
  categoryButtonActive: {
    backgroundColor: Colors.black,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
  },
  categoryTextActive: {
    color: Colors.white,
  },
  faqList: {
    flex: 1,
  },
  faqListContent: {
    padding: Layout.screenPadding,
    paddingTop: 0,
    paddingBottom: Layout.tabBarHeight + 80, // Extra space for support button
  },
  faqItem: {
    marginBottom: Spacing.md,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginRight: Spacing.md,
  },
  faqAnswer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  faqAnswerText: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray700,
    fontFamily: Typography.fontFamily.primary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    marginBottom: Spacing.md,
  },
  faqTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  tag: {
    backgroundColor: Colors.gray100,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  tagText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['4xl'],
  },
  emptyText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray500,
    fontFamily: Typography.fontFamily.primary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
});

export default HelpScreen;
