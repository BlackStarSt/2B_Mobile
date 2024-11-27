import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';

import alertIcon from '../img/AlertIcon.png';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroPage = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const createLogin = async () => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      let users = usersData ? JSON.parse(usersData) : [];

      let newUser = { username, password };
      let userExists = users.some(user => user.username === newUser.username);

      if(userExists) {
        setErrorMessage('Usuário já existente!')
        console.log(users);
      } else if (username == '' || password == '') {
        setErrorMessage('Há campos em branco!');
      } else {
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        setErrorMessage('Conta criada com sucesso!');

        const contaCriada = true;
        if(contaCriada) {
          setTimeout(() => {
            navigation.navigate('Login');
          }, 4000);
        }
      }
    } catch (error) {
      setErrorMessage('Error: ' + error);
    }
  };

  return (
    <View style={styles.container}>
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
      {errorMessage ? <View style={styles.divErro}>
        <Image style={alertIcon} source={alertIcon} />
        <Text style={styles.error}>{errorMessage}</Text>
      </View> : null}
      <TouchableOpacity style={styles.button} onPress={createLogin}>
        <Text style={styles.button_text}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroPage;
