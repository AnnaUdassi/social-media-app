import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// In a real app, this would use AppleHealthKit
// https://github.com/react-native-health/react-native-health

const screenWidth = Dimensions.get('window').width;

// Mock data - would come from Apple Health API in real app
const mockHealthData = {
  steps: {
    today: 8432,
    goal: 10000,
    weekData: [6500, 7200, 8100, 5600, 9300, 7800, 8432],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  heartRate: {
    current: 72,
    resting: 65,
    weekData: [68, 72, 75, 70, 68, 71, 72],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  calories: {
    burned: 420,
    goal: 600,
    weekData: [380, 420, 510, 320, 480, 400, 420],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  workouts: [
    { id: 1, type: 'Running', duration: '28:30', distance: '5.2 km', calories: 320, date: 'Today, 08:30 AM' },
    { id: 2, type: 'Strength Training', duration: '45:00', calories: 280, date: 'Yesterday, 06:45 PM' },
    { id: 3, type: 'Cycling', duration: '1:15:00', distance: '25 km', calories: 450, date: '2 days ago, 10:15 AM' },
  ]
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#0066cc',
  },
};

export default function HealthDataScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('steps');
  
  const connectAppleWatch = () => {
    // This would actually connect to Apple Health in a real app
    Alert.alert(
      "Connect to Apple Health",
      "This would open Apple Health permissions dialog in a real app.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Simulate Connection", 
          onPress: () => setIsConnected(true)
        }
      ]
    );
  };
  
  const renderChart = () => {
    const data = mockHealthData[activeTab];
    
    return (
      <LineChart
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.weekData,
            }
          ]
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    );
  };
  
  const renderMetricCard = (title, current, goal, unit = '') => {
    const percentage = Math.min(100, Math.round((current / goal) * 100));
    
    return (
      <View style={styles.metricCard}>
        <Text style={styles.metricTitle}>{title}</Text>
        <View style={styles.metricContent}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${percentage}%` }]} />
          </View>
          <Text style={styles.metricValue}>
            {current}{unit} <Text style={styles.metricGoal}>/ {goal}{unit}</Text>
          </Text>
        </View>
      </View>
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      {!isConnected ? (
        <View style={styles.connectContainer}>
          <Text style={styles.connectTitle}>Connect Your Apple Watch</Text>
          <Text style={styles.connectDesc}>
            Link your Apple Watch to track workouts, heart rate, and more.
          </Text>
          <TouchableOpacity style={styles.connectButton} onPress={connectAppleWatch}>
            <Text style={styles.connectButtonText}>Connect to Apple Health</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Health Stats</Text>
            <Text style={styles.headerSubtitle}>Today</Text>
          </View>
          
          <View style={styles.metricsContainer}>
            {renderMetricCard('Steps', mockHealthData.steps.today, mockHealthData.steps.goal)}
            {renderMetricCard('Calories Burned', mockHealthData.calories.burned, mockHealthData.calories.goal, ' cal')}
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>Heart Rate</Text>
              <View style={styles.heartRateContainer}>
                <Text style={styles.heartRateValue}>{mockHealthData.heartRate.current}</Text>
                <Text style={styles.heartRateUnit}>BPM</Text>
              </View>
              <Text style={styles.restingHeartRate}>
                Resting: {mockHealthData.heartRate.resting} BPM
              </Text>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            <View style={styles.chartTabs}>
              <TouchableOpacity 
                style={[styles.chartTab, activeTab === 'steps' && styles.activeChartTab]}
                onPress={() => setActiveTab('steps')}
              >
                <Text style={[styles.chartTabText, activeTab === 'steps' && styles.activeChartTabText]}>Steps</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.chartTab, activeTab === 'heartRate' && styles.activeChartTab]}
                onPress={() => setActiveTab('heartRate')}
              >
                <Text style={[styles.chartTabText, activeTab === 'heartRate' && styles.activeChartTabText]}>Heart Rate</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.chartTab, activeTab === 'calories' && styles.activeChartTab]}
                onPress={() => setActiveTab('calories')}
              >
                <Text style={[styles.chartTabText, activeTab === 'calories' && styles.activeChartTabText]}>Calories</Text>
              </TouchableOpacity>
            </View>
            
            {renderChart()}
            <Text style={styles.chartTitle}>This Week</Text>
          </View>
          
          <View style={styles.workoutsContainer}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            {mockHealthData.workouts.map(workout => (
              <View key={workout.id} style={styles.workoutCard}>
                <View style={styles.workoutHeader}>
                  <Text style={styles.workoutType}>{workout.type}</Text>
                  <Text style={styles.workoutDate}>{workout.date}</Text>
                </View>
                <View style={styles.workoutStats}>
                  <View style={styles.workoutStat}>
                    <Text style={styles.statLabel}>Duration</Text>
                    <Text style={styles.statValue}>{workout.duration}</Text>
                  </View>
                  {workout.distance && (
                    <View style={styles.workoutStat}>
                      <Text style={styles.statLabel}>Distance</Text>
                      <Text style={styles.statValue}>{workout.distance}</Text>
                    </View>
                  )}
                  <View style={styles.workoutStat}>
                    <Text style={styles.statLabel}>Calories</Text>
                    <Text style={styles.statValue}>{workout.calories} cal</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  connectContainer: {
    backgroundColor: '#ffffff',
    margin: 15,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  connectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  connectDesc: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  connectButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  connectButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  header: {
    padding: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  metricContent: {
    justifyContent: 'space-between',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#0066cc',
    borderRadius: 3,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  metricGoal: {
    fontWeight: 'normal',
    color: '#888',
  },
  heartRateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  heartRateValue: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  heartRateUnit: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    marginLeft: 5,
  },
  restingHeartRate: {
    fontSize: 12,
    color: '#888',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    margin: 15,
    borderRadius: 10,
    padding: 15,
  },
  chartTabs: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  chartTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  activeChartTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0066cc',
  },
  chartTabText: {
    color: '#888',
  },
  activeChartTabText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
  chartTitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
  },
  workoutsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  workoutCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  workoutType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutDate: {
    color: '#888',
    fontSize: 12,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  workoutStat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 3,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});