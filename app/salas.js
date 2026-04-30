import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Salas() {
  const router = useRouter();
  const [salasDisponiveis, setSalasDisponiveis] = useState({});

  async function carregarSalas() {
    const dados = await AsyncStorage.getItem('salas');

    if (dados) {
      setSalasDisponiveis(JSON.parse(dados));
    } else {
      setSalasDisponiveis({});
    }
  }

  async function excluirDia(dia) {
  const novasSalas = { ...salasDisponiveis };

  delete novasSalas[dia];

  await AsyncStorage.setItem(
    'salas',
    JSON.stringify(novasSalas)
  );

  setSalasDisponiveis(novasSalas);
}

  useEffect(() => {
    carregarSalas();
  }, []);

  return (
    <View style={styles.wrapper}>
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

          <TouchableOpacity
            style={styles.botaoExcluir}
            onPress={() => excluirDia(dia)}
          >
            <Text style={styles.botaoTexto}>
              Excluir Dia
            </Text>
          </TouchableOpacity>
        </View>
       
      ))}

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.back()}
      >
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#121212',
    padding: 25,
    borderRadius: 16,
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
    color: '#FF0090',
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
    backgroundColor: '#FF0090',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },

  botaoExcluir: {
    backgroundColor: '#B22222',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f0f'
  }
});