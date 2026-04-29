import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Salas Livres</Text>
        <Text style={styles.subtitulo}>
            Consulte salas disponíveis por andar
        </Text>

        <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/salas')}
        >
            <Text style={styles.botaoTexto}>Ver Salas</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/cadastro')}
        >
            <Text style={styles.botaoTexto}>Cadastrar Sala</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff'
  },

  subtitulo: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center'
  },

  botao: {
    backgroundColor: '#F57726',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});