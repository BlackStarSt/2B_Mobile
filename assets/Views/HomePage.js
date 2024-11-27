import React from 'react';
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import homeImage from '../img/HomeImage.webp';
import writeIcon from '../img/writeIcon.png';
import Twit from '../components/Twit';

const HomePage = ({ route, navigation }) => {
  const username = route?.params?.username;
  const [posts, setPosts] = useState([]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  const fetchPosts = async () => {
    try {
      const posts = await AsyncStorage.getItem('posts');
      const postsArray = posts ? JSON.parse(posts) : [];

      setPosts(postsArray);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      alert('Erro ao carregar as postagens.');
    }
  };

  return (
    <View style={[styles.container, styles.containerHome]}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image style={styles.profileImage} source={homeImage} />
          <Text style={styles.profileText}> Hello, {username}! </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.btnHeader]}
          onPress={handleLogout}>
          <Text style={styles.button_text}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Twit username={item.username} content={item.content} />
        )}
      />
      <TouchableOpacity
        style={[styles.button, styles.btnNewTwit]}
        onPress={() => navigation.navigate('TwitPage', { username })}>
        <Image source={writeIcon} style={styles.writeIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
