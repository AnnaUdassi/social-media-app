import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Simple app with no navigation, just components on a single page
export default function SimpleApp() {
  const [activeTab, setActiveTab] = useState('home');
  
  // Sample content for each tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome to FitSocial</Text>
            <Text style={styles.subtitle}>Your fitness journey starts here</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>7,500</Text>
                <Text style={styles.statLabel}>Daily Steps</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>1,800</Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Today's Activity</Text>
            <View style={styles.activityCard}>
              <Text style={styles.activityTitle}>Morning Run</Text>
              <Text style={styles.activityDetail}>5.2 km • 32 min • 320 kcal</Text>
            </View>
          </View>
        );
      
      case 'recipes':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Healthy Recipes</Text>
            
            <View style={styles.recipeCard}>
              <Text style={styles.recipeTitle}>Protein Smoothie Bowl</Text>
              <Text style={styles.recipeDetail}>320 kcal • 25g protein • 15 min prep</Text>
              <Text style={styles.recipeIngredients}>Ingredients: Banana, berries, protein powder, almond milk, chia seeds</Text>
            </View>
            
            <View style={styles.recipeCard}>
              <Text style={styles.recipeTitle}>Grilled Chicken Salad</Text>
              <Text style={styles.recipeDetail}>420 kcal • 32g protein • 20 min prep</Text>
              <Text style={styles.recipeIngredients}>Ingredients: Chicken breast, mixed greens, cherry tomatoes, cucumber, olive oil</Text>
            </View>
          </View>
        );
      
      case 'profile':
        return (
          <View style={styles.contentContainer}>
            <View style={styles.profileHeader}>
              <View style={styles.profileAvatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileBio}>Fitness enthusiast • Runner • Meal prep expert</Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>75</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>27</Text>
                <Text style={styles.statLabel}>Recipes</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statLabel}>Friends</Text>
              </View>
            </View>
          </View>
        );
      
      default:
        return <View><Text>Content not found</Text></View>;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        {renderContent()}
      </ScrollView>
      
      {/* Simple Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'home' && styles.activeTab]} 
          onPress={() => setActiveTab('home')}
        >
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'recipes' && styles.activeTab]} 
          onPress={() => setActiveTab('recipes')}
        >
          <Text style={styles.tabText}>Recipes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]} 
          onPress={() => setActiveTab('profile')}
        >
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  recipeCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  recipeIngredients: {
    fontSize: 14,
    marginTop: 10,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileBio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#444',
  },
}); 