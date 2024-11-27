import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroPage from './assets/Views/CadastroPage';
import HomePage from './assets/Views/HomePage';
import LoginPage from './assets/Views/LoginPage';
import TwitPage from './assets/Views/NewTwitPage'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="TwitPage"
          component={TwitPage}
          options={{
            title: 'Nova postagem',
            headerStyle: {
              backgroundColor: '#8C1FCE',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white'
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#8C1FCE',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroPage}
          options={{
            title: 'Cadastro',
            headerStyle: {
              backgroundColor: '#8C1FCE',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#8C1FCE',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
