import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { salasDisponiveis } from '../data/salas';

export default function Salas() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Salas Livres da Semana</Text>

      {Object.entries(salasDisponiveis).map(([dia, horarios]) => (
        <View key={dia} style={styles.card}>
          <Text style={styles.dia}>{dia}</Text>

          <Text style={styles.texto}>
            Até 12h → Sala {horarios.manha}
          </Text>

          <Text style={styles.texto}>
            12h às 18h → Sala {horarios.tarde}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.back()}
      >
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop: 60
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center'
  },

  card: {
    backgroundColor: '#1E1E1E',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15
  },

  dia: {
    color: '#F57726',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },

  texto: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 4
  },

  botao: {
    marginTop: 20,
    backgroundColor: '#F57726',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
});