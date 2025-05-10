import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';

// Mock data - would come from API in real app
const FRIENDS_DATA = [
  {
    id: '101',
    name: 'Sarah Johnson',
    username: '@sarahj',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Marathon runner, yoga enthusiast',
    mutual: 12,
    isFollowing: true,
  },
  {
    id: '102',
    name: 'Mike Chen',
    username: '@mikechen',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Crossfit trainer, nutrition coach',
    mutual: 8,
    isFollowing: true,
  },
  {
    id: '103',
    name: 'Emily Wilson',
    username: '@emilyw',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    bio: 'Weightlifter, meal prep expert',
    mutual: 5,
    isFollowing: false,
  },
];

const SUGGESTED_FRIENDS = [
  {
    id: '201',
    name: 'James Rodriguez',
    username: '@jrodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    bio: 'Trail runner, hiking enthusiast',
    mutual: 3,
    isFollowing: false,
  },
  {
    id: '202',
    name: 'Tina Patel',
    username: '@tpatel',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    bio: 'HIIT workout lover, healthy cooking',
    mutual: 7,
    isFollowing: false,
  },
  {
    id: '203',
    name: 'David Smith',
    username: '@dsmith',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    bio: 'Powerlifter, protein shake mixologist',
    mutual: 2,
    isFollowing: false,
  },
];

// This would be populated by an API call in a real app
const FRIEND_REQUESTS = [
  {
    id: '301',
    name: 'Lisa Thompson',
    username: '@lisat',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    bio: 'Yoga instructor, meditation practitioner',
    mutual: 4,
  },
  {
    id: '302',
    name: 'Ryan Nguyen',
    username: '@ryann',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    bio: 'Basketball player, high protein meal prep',
    mutual: 6,
  },
];

const FriendRequestCard = ({ friend, onAccept, onDecline }) => {
  return (
    <View style={styles.requestCard}>
      <Image source={{ uri: friend.avatar }} style={styles.avatar} />
      <View style={styles.requestInfo}>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.username}>{friend.username}</Text>
        <Text style={styles.mutual}>{friend.mutual} mutual friends</Text>
      </View>
      <View style={styles.requestActions}>
        <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FriendCard = ({ friend, onToggleFollow }) => {
  return (
    <View style={styles.friendCard}>
      <Image source={{ uri: friend.avatar }} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.username}>{friend.username}</Text>
        <Text style={styles.bio} numberOfLines={1}>{friend.bio}</Text>
        {friend.mutual > 0 && (
          <Text style={styles.mutual}>{friend.mutual} mutual friends</Text>
        )}
      </View>
      <TouchableOpacity 
        style={[
          styles.followButton, 
          friend.isFollowing ? styles.followingButton : {}
        ]}
        onPress={() => onToggleFollow(friend.id)}
      >
        <Text style={[
          styles.followButtonText,
          friend.isFollowing ? styles.followingButtonText : {}
        ]}>
          {friend.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function FriendsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends');
  const [friends, setFriends] = useState(FRIENDS_DATA);
  const [suggested, setSuggested] = useState(SUGGESTED_FRIENDS);
  const [requests, setRequests] = useState(FRIEND_REQUESTS);
  
  const handleToggleFollow = (friendId) => {
    // Toggle friend status
    setFriends(friends.map(friend => 
      friend.id === friendId 
        ? { ...friend, isFollowing: !friend.isFollowing } 
        : friend
    ));
    
    // Toggle suggested status
    setSuggested(suggested.map(friend => 
      friend.id === friendId 
        ? { ...friend, isFollowing: !friend.isFollowing } 
        : friend
    ));
  };
  
  const handleAcceptRequest = (friendId) => {
    const acceptedFriend = requests.find(req => req.id === friendId);
    if (acceptedFriend) {
      // Add to friends list
      setFriends([
        ...friends,
        {
          ...acceptedFriend,
          isFollowing: true,
        }
      ]);
      
      // Remove from requests
      setRequests(requests.filter(req => req.id !== friendId));
    }
  };
  
  const handleDeclineRequest = (friendId) => {
    // Remove from requests
    setRequests(requests.filter(req => req.id !== friendId));
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'friends':
        return (
          <FlatList
            data={friends}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <FriendCard 
                friend={item} 
                onToggleFollow={handleToggleFollow}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>
                You haven't added any friends yet. Check out the suggested tab to find fitness buddies!
              </Text>
            }
          />
        );
      case 'requests':
        return (
          <View>
            {requests.length > 0 ? (
              <FlatList
                data={requests}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <FriendRequestCard 
                    friend={item} 
                    onAccept={() => handleAcceptRequest(item.id)}
                    onDecline={() => handleDeclineRequest(item.id)}
                  />
                )}
              />
            ) : (
              <Text style={styles.emptyMessage}>
                You don't have any pending friend requests.
              </Text>
            )}
          </View>
        );
      case 'suggested':
        return (
          <FlatList
            data={suggested}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <FriendCard 
                friend={item} 
                onToggleFollow={handleToggleFollow}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>
                No suggestions available at the moment. Check back later!
              </Text>
            }
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search for friends..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Requests {requests.length > 0 && `(${requests.length})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'suggested' && styles.activeTab]}
          onPress={() => setActiveTab('suggested')}
        >
          <Text style={[styles.tabText, activeTab === 'suggested' && styles.activeTabText]}>
            Suggested
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  friendCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  requestCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  friendInfo: {
    flex: 1,
  },
  requestInfo: {
    flex: 1,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#888',
    marginBottom: 3,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  mutual: {
    fontSize: 12,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0066cc',
  },
  followButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  followingButtonText: {
    color: '#0066cc',
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  acceptButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
    marginRight: 10,
  },
  acceptButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  declineButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  declineButtonText: {
    color: '#888888',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    paddingHorizontal: 30,
    lineHeight: 22,
  },
});