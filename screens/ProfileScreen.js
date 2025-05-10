import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

// Mock user data - would come from API in real app
const USER_DATA = {
  id: '101',
  name: 'Alex Johnson',
  username: '@alexj',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: 'Fitness enthusiast, marathon runner, and nutrition coach. Always looking to connect with others on their fitness journey!',
  stats: {
    posts: 48,
    friends: 215,
    achievements: 12,
  },
  fitnessGoals: [
    { id: 1, title: 'Run a marathon', progress: 80, target: 'October 15, 2023' },
    { id: 2, title: 'Bench press 225 lbs', progress: 65, target: '3 times' },
    { id: 3, title: 'Maintain daily step count', progress: 90, target: '10,000 steps' },
  ],
  achievements: [
    { id: 1, title: '30-Day Streak', icon: '🔥', date: 'April 2023' },
    { id: 2, title: 'First 10K', icon: '🏃‍♂️', date: 'January 2023' },
    { id: 3, title: 'Nutrition Master', icon: '🥗', date: 'March 2023' },
  ],
  recentActivities: [
    { id: 1, type: 'Running', date: 'Yesterday', distance: '5.2 km', time: '28:30', icon: '🏃‍♂️' },
    { id: 2, type: 'Cycling', date: '3 days ago', distance: '12 km', time: '45:15', icon: '🚴‍♂️' },
    { id: 3, type: 'Weightlifting', date: '5 days ago', sets: '4 sets', time: '50:00', icon: '🏋️‍♂️' },
  ]
};

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('activities');
  
  const renderGoalProgress = (goal) => {
    return (
      <View key={goal.id} style={styles.goalItem}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>{goal.title}</Text>
          <Text style={styles.goalPercentage}>{goal.progress}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${goal.progress}%` }]} />
        </View>
        <Text style={styles.goalTarget}>Target: {goal.target}</Text>
      </View>
    );
  };
  
  const renderAchievement = (achievement) => {
    return (
      <View key={achievement.id} style={styles.achievementItem}>
        <Text style={styles.achievementIcon}>{achievement.icon}</Text>
        <View>
          <Text style={styles.achievementTitle}>{achievement.title}</Text>
          <Text style={styles.achievementDate}>{achievement.date}</Text>
        </View>
      </View>
    );
  };
  
  const renderActivity = (activity) => {
    return (
      <View key={activity.id} style={styles.activityItem}>
        <Text style={styles.activityIcon}>{activity.icon}</Text>
        <View style={styles.activityDetails}>
          <Text style={styles.activityType}>{activity.type}</Text>
          <Text style={styles.activityDate}>{activity.date}</Text>
        </View>
        <View style={styles.activityStats}>
          {activity.distance && <Text style={styles.activityStat}>{activity.distance}</Text>}
          {activity.sets && <Text style={styles.activityStat}>{activity.sets}</Text>}
          <Text style={styles.activityStat}>{activity.time}</Text>
        </View>
      </View>
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: USER_DATA.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{USER_DATA.name}</Text>
          <Text style={styles.username}>{USER_DATA.username}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.bio}>{USER_DATA.bio}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{USER_DATA.stats.posts}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <Text style={styles.statNumber}>{USER_DATA.stats.friends}</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{USER_DATA.stats.achievements}</Text>
          <Text style={styles.statLabel}>Achievements</Text>
        </View>
      </View>
      
      <View style={styles.goalsContainer}>
        <Text style={styles.sectionTitle}>Fitness Goals</Text>
        {USER_DATA.fitnessGoals.map(goal => renderGoalProgress(goal))}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Goal</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'activities' && styles.activeTab]}
          onPress={() => setActiveTab('activities')}
        >
          <Text style={[styles.tabText, activeTab === 'activities' && styles.activeTabText]}>
            Activities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
          onPress={() => setActiveTab('achievements')}
        >
          <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>
            Achievements
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'activities' && (
        <View style={styles.activitiesContainer}>
          {USER_DATA.recentActivities.map(activity => renderActivity(activity))}
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View All Activities</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {activeTab === 'achievements' && (
        <View style={styles.achievementsContainer}>
          {USER_DATA.achievements.map(achievement => renderAchievement(achievement))}
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View All Achievements</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginBottom: 15,
  },
  statItem: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: '#f0f0f0',
    borderRightColor: '#f0f0f0',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  goalsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  goalItem: {
    marginBottom: 15,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  goalPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#0066cc',
    borderRadius: 5,
  },
  goalTarget: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0066cc',
    borderRadius: 5,
    borderStyle: 'dashed',
    marginTop: 10,
  },
  addButtonText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0066cc',
  },
  tabText: {
    color: '#888',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#0066cc',
  },
  activitiesContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  activityDetails: {
    flex: 1,
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityDate: {
    fontSize: 12,
    color: '#888',
  },
  activityStats: {
    alignItems: 'flex-end',
  },
  activityStat: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  achievementsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  achievementIcon: {
    fontSize: 30,
    marginRight: 15,
    backgroundColor: '#f0f8ff',
    width: 50,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    lineHeight: 50,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementDate: {
    fontSize: 12,
    color: '#888',
  },
  viewMoreButton: {
    marginTop: 15,
    alignItems: 'center',
    paddingVertical: 10,
  },
  viewMoreText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});