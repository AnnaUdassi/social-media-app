import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Sample data - would come from API in real app
const SAMPLE_POSTS = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    content: 'Just completed a 5k run! Personal best time.',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 5,
    type: 'workout',
    workoutData: {
      activity: 'Running',
      distance: '5 km',
      time: '28:30',
      calories: 320,
    }
  },
  {
    id: '2',
    user: {
      id: '102',
      name: 'Mike Chen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    content: 'Made this high-protein lunch today. Perfect post-workout meal!',
    timestamp: '4 hours ago',
    likes: 31,
    comments: 8,
    type: 'recipe',
    recipeData: {
      name: 'Grilled Chicken Salad',
      calories: 450,
      protein: '35g',
      carbs: '25g',
      fat: '15g',
    }
  },
];

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
      </View>
      
      <Text style={styles.postContent}>{post.content}</Text>
      
      {post.type === 'workout' && (
        <View style={styles.workoutData}>
          <Text style={styles.workoutTitle}>{post.workoutData.activity}</Text>
          <View style={styles.workoutStats}>
            <Text style={styles.stat}>🏃‍♂️ {post.workoutData.distance}</Text>
            <Text style={styles.stat}>⏱️ {post.workoutData.time}</Text>
            <Text style={styles.stat}>🔥 {post.workoutData.calories} cal</Text>
          </View>
        </View>
      )}
      
      {post.type === 'recipe' && (
        <View style={styles.recipeData}>
          <Text style={styles.recipeTitle}>{post.recipeData.name}</Text>
          <View style={styles.nutritionInfo}>
            <Text style={styles.nutrient}>🔥 {post.recipeData.calories} cal</Text>
            <Text style={styles.nutrient}>🥩 {post.recipeData.protein} protein</Text>
            <Text style={styles.nutrient}>🍚 {post.recipeData.carbs} carbs</Text>
            <Text style={styles.nutrient}>🥑 {post.recipeData.fat} fat</Text>
          </View>
        </View>
      )}
      
      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => setLiked(!liked)} style={styles.actionButton}>
          <Text style={[styles.actionText, liked && styles.liked]}>
            {liked ? '❤️' : '🤍'} {post.likes + (liked ? 1 : 0)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 {post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>🔗 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newPostButton}>
        <Text style={styles.newPostText}>What's your fitness update today?</Text>
      </TouchableOpacity>
      
      <FlatList
        data={SAMPLE_POSTS}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  newPostButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  newPostText: {
    color: '#888',
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 15,
  },
  workoutData: {
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  workoutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#0066cc',
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 14,
  },
  recipeData: {
    backgroundColor: '#fff8f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#cc6600',
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  nutrient: {
    fontSize: 14,
    width: '50%',
    marginBottom: 4,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
  },
  liked: {
    color: '#e74c3c',
  },
});