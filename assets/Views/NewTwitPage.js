import { View, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import alertIcon from '../img/AlertIcon.png';

const NewTwit = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [text, setText] = useState('');
  const maxLetras = 500;

  const handlePost = async () => {
    if (!text.trim()) {
      setErrorMessage('Por favor, digite algo antes de publicar.');
      return;
    }

    try {
      const username = route?.params?.username || 'Anônimo';
      const content = text;

      const newPost = {
        id: Date.now(),
        username: username,
        content: content,
      };

      const posts = await AsyncStorage.getItem('posts');
      const postsArray = posts ? JSON.parse(posts) : [];

      postsArray.push(newPost);

      await AsyncStorage.setItem('posts', JSON.stringify(postsArray));

      setErrorMessage('Post criado com sucesso!');
      setText('');

      const postCriado = true;
      if (postCriado) {
        setTimeout(() => {
          navigation.navigate('Home', username);
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setErrorMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <View style={styles.newTwit}>
      <TextInput
        style={styles.newTwitInput}
        multiline
        maxLength={maxLetras}
        value={text}
        onChangeText={setText}
        placeholder="Digite seu texto aqui..."></TextInput>
      <Text style={styles.maxLetras}>
        Caracteres restantes:{' '}
        <Text style={{ fontWeight: 'bold' }}>{maxLetras - text.length}</Text>
      </Text>
      {errorMessage ? (
        <View style={styles.divErro}>
          <Image style={alertIcon} source={alertIcon} />
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      ) : null}
      <TouchableOpacity
        onPress={handlePost}
        style={[styles.button, styles.btnTwit]}>
        <Text style={styles.button_text}>Pulicar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewTwit;
