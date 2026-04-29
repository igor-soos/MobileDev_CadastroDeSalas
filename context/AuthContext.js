import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // verificar sessão salva ao abrir app
  useEffect(() => {
    carregarSessao();
  }, []);

  async function carregarSessao() {
    try {
      const session = await AsyncStorage.getItem('@session');

      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (error) {
      console.log('Erro ao carregar sessão:', error);
    } finally {
      setLoading(false);
    }
  }

  // cadastro de usuário
  async function register(nome, email, senha) {
    try {
      const novoUsuario = {
        nome,
        email,
        senha
      };

      await AsyncStorage.setItem(
        '@user',
        JSON.stringify(novoUsuario)
      );

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao cadastrar usuário'
      };
    }
  }

  // login
  async function login(email, senha) {
    try {
      const userStorage = await AsyncStorage.getItem('@user');

      if (!userStorage) {
        return {
          success: false,
          message: 'Usuário não cadastrado'
        };
      }

      const usuario = JSON.parse(userStorage);

      if (
        usuario.email !== email ||
        usuario.senha !== senha
      ) {
        return {
          success: false,
          message: 'E-mail ou senha inválidos'
        };
      }

      await AsyncStorage.setItem(
        '@session',
        JSON.stringify(usuario)
      );

      setUser(usuario);

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao realizar login'
      };
    }
  }

  // logout
  async function logout() {
    await AsyncStorage.removeItem('@session');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}