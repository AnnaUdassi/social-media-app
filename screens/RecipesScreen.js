import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  ScrollView 
} from 'react-native';

// Mock recipe data
const RECIPES_DATA = [
  {
    id: '1',
    title: 'Protein-Packed Breakfast Bowl',
    image: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    time: '15 min',
    difficulty: 'Easy',
    calories: 420,
    protein: '32g',
    carbs: '45g',
    fat: '12g',
    likes: 245,
    bookmarked: false,
    ingredients: [
      '2 eggs',
      '1/2 cup Greek yogurt',
      '1/4 cup granola',
      '1 tbsp honey',
      '1 cup mixed berries',
      '1 tbsp chia seeds'
    ],
    steps: [
      'Cook the eggs to your preference (scrambled, poached, etc.)',
      'In a bowl, layer the Greek yogurt as the base',
      'Add the cooked eggs, granola, and berries',
      'Drizzle with honey and sprinkle chia seeds on top',
      'Enjoy immediately!'
    ],
    tags: ['Breakfast', 'High-Protein', 'Vegetarian']
  },
  {
    id: '2',
    title: 'Mediterranean Chicken Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    user: {
      name: 'Mike Chen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    time: '25 min',
    difficulty: 'Medium',
    calories: 380,
    protein: '35g',
    carbs: '20g',
    fat: '15g',
    likes: 189,
    bookmarked: true,
    ingredients: [
      '6 oz grilled chicken breast, sliced',
      '2 cups mixed greens',
      '1/4 cup cherry tomatoes, halved',
      '1/4 cup cucumber, diced',
      '2 tbsp olives, sliced',
      '2 tbsp feta cheese, crumbled',
      '1 tbsp olive oil',
      '1 tbsp lemon juice',
      'Salt and pepper to taste'
    ],
    steps: [
      'In a large bowl, combine the mixed greens, tomatoes, cucumber, and olives',
      'In a small bowl, whisk together olive oil, lemon juice, salt, and pepper',
      'Add the sliced grilled chicken to the salad',
      'Drizzle the dressing over the salad and toss gently',
      'Sprinkle with feta cheese before serving'
    ],
    tags: ['Lunch', 'High-Protein', 'Low-Carb']
  },
  {
    id: '3',
    title: 'Post-Workout Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    user: {
      name: 'Emily Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    time: '10 min',
    difficulty: 'Easy',
    calories: 350,
    protein: '28g',
    carbs: '40g',
    fat: '8g',
    likes: 312,
    bookmarked: false,
    ingredients: [
      '1 scoop protein powder',
      '1 frozen banana',
      '1/2 cup frozen berries',
      '1 cup almond milk',
      '1 tbsp almond butter',
      'Toppings: sliced banana, granola, chia seeds'
    ],
    steps: [
      'Add protein powder, frozen banana, berries, almond milk, and almond butter to a blender',
      'Blend until smooth and creamy',
      'Pour into a bowl',
      'Add toppings of your choice',
      'Enjoy immediately after your workout'
    ],
    tags: ['Breakfast', 'Post-Workout', 'Vegan']
  },
];

const CATEGORIES = [
  { id: '1', name: 'All', icon: '🍽️' },
  { id: '2', name: 'Breakfast', icon: '🍳' },
  { id: '3', name: 'Lunch', icon: '🥗' },
  { id: '4', name: 'Dinner', icon: '🍲' },
  { id: '5', name: 'Snacks', icon: '🥜' },
  { id: '6', name: 'Desserts', icon: '🍰' },
  { id: '7', name: 'Vegetarian', icon: '🥦' },
  { id: '8', name: 'High-Protein', icon: '💪' },
  { id: '9', name: 'Low-Carb', icon: '🥑' },
];

const RecipeCard = ({ recipe, onPress, onToggleBookmark }) => {
  return (
    <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      <View style={styles.recipeOverlay}>
        <View style={styles.recipeHeader}>
          <View style={styles.userInfo}>
            <Image source={{ uri: recipe.user.avatar }} style={styles.avatar} />
            <Text style={styles.userName}>{recipe.user.name}</Text>
          </View>
          <TouchableOpacity onPress={() => onToggleBookmark(recipe.id)}>
            <Text style={styles.bookmarkIcon}>
              {recipe.bookmarked ? '🔖' : '🔖'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recipeFooter}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <View style={styles.recipeStats}>
            <Text style={styles.recipeStat}>⏱️ {recipe.time}</Text>
            <Text style={styles.recipeStat}>🔥 {recipe.calories} cal</Text>
            <Text style={styles.recipeStat}>💪 {recipe.protein} protein</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RecipeDetailModal = ({ recipe, visible, onClose }) => {
  if (!visible) return null;
  
  return (
    <View style={styles.modalContainer}>
      <ScrollView style={styles.modalContent}>
        <Image source={{ uri: recipe.image }} style={styles.detailImage} />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        
        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>{recipe.title}</Text>
          
          <View style={styles.userInfoDetail}>
            <Image source={{ uri: recipe.user.avatar }} style={styles.avatarDetail} />
            <Text style={styles.userNameDetail}>{recipe.user.name}</Text>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⏱️</Text>
              <Text style={styles.statValue}>{recipe.time}</Text>
              <Text style={styles.statLabel}>Time</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={styles.statValue}>{recipe.difficulty}</Text>
              <Text style={styles.statLabel}>Difficulty</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statValue}>{recipe.calories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>
          
          <View style={styles.nutritionCard}>
            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.protein}</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.carbs}</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.fat}</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.ingredientsSection}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.stepsSection}>
            <Text style={styles.sectionTitle}>Preparation</Text>
            {recipe.steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.tagsRow}>
            {recipe.tags.map((tag, index) => (
              <View key={index} style={styles.tagItem}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Share Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Save to Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default function RecipesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1'); // 'All' category
  const [recipes, setRecipes] = useState(RECIPES_DATA);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleToggleBookmark = (recipeId) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, bookmarked: !recipe.bookmarked } 
        : recipe
    ));
  };
  
  const handleRecipePress = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };
  
  // Filter recipes based on search query and selected category
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '1' || recipe.tags.includes(CATEGORIES.find(cat => cat.id === selectedCategory)?.name);
    return matchesSearch && matchesCategory;
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.categoryItem, selectedCategory === item.id && styles.selectedCategory]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={[styles.categoryText, selectedCategory === item.id && styles.selectedCategoryText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RecipeCard 
            recipe={item} 
            onPress={() => handleRecipePress(item)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
        contentContainerStyle={styles.recipesContainer}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            No recipes found. Try changing your search or category.
          </Text>
        }
      />
      
      <RecipeDetailModal 
        recipe={selectedRecipe} 
        visible={modalVisible} 
        onClose={closeModal}
      />
      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#0066cc',
  },
  categoryIcon: {
    fontSize: 16,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#444',
  },
  selectedCategoryText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  recipesContainer: {
    padding: 15,
  },
  recipeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  userName: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookmarkIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  recipeFooter: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    padding: 10,
  },
  recipeTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recipeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeStat: {
    color: '#ffffff',
    fontSize: 12,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    paddingHorizontal: 30,
    lineHeight: 22,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0066cc',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  
  // Modal styles
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    zIndex: 1000,
  },
  modalContent: {
    flex: 1,
  },
  detailImage: {
    width: '100%',
    height: 250,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailContent: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  userInfoDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarDetail: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userNameDetail: {
    fontSize: 14,
    color: '#666',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 18,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  nutritionCard: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
  },
  ingredientsSection: {
    marginBottom: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 18,
    color: '#0066cc',
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    flex: 1,
  },
  stepsSection: {
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0066cc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  stepNumber: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tagItem: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});