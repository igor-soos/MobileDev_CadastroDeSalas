import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Bem-vindo{user?.nome ? `, ${user.nome}` : ''}
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push('/salas')}
      >
        <Text style={styles.botaoTexto}>
          Ver Salas Livres
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push('/cadastro')}
      >
        <Text style={styles.botaoTexto}>
          Cadastrar Sala
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoLogout}
        onPress={handleLogout}
      >
        <Text style={styles.botaoTexto}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40
  },

  botao: {
    backgroundColor: '#FF0090',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15
  },

  botaoLogout: {
    backgroundColor: '#B22222',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});