import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../img/logo.png';
import alertIcon from '../img/AlertIcon.png';
import styles from '../css/styles.css';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  const handleButtonClick = () => {
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 4500);
  };

  const handleLogin = async () => {
    const usersData = await AsyncStorage.getItem('users');
    let users = usersData ? JSON.parse(usersData) : [];

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      try {
        await AsyncStorage.setItem('username', username);
        navigation.navigate('Home', { username });
      } catch (error) {
        setErrorMessage('Error: ' + error);
      }
    } else if(password === '' || username === '') {
      handleButtonClick();
      setErrorMessage('Há campos em branco!');
    } else {
      handleButtonClick();
      setErrorMessage('Tente novamente...');
    }
  };

  return (
    <View style={styles.container}>
      {isAlertVisible && (
        <View style={styles.divErro}>
          <Image style={alertIcon} source={alertIcon} />
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      )}
      <Image style={styles.logo} source={logo} />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.button_text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn_cadastro}
        title="Ou cadastre-se aqui!"
        onPress={() => navigation.navigate('Cadastro')}>
        Ou cadastre-se aqui!
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
