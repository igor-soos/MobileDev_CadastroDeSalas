import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
  const router = useRouter();

  const [dia, setDia] = useState('');
  const [salaManha, setSalaManha] = useState('');
  const [salaTarde, setSalaTarde] = useState('');

  async function salvarSala() {
    if (!dia || !salaManha || !salaTarde) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const novaSala = {
      manha: salaManha,
      tarde: salaTarde
    };

    try {
      const dadosAtuais = await AsyncStorage.getItem('salas');
      let salas = dadosAtuais ? JSON.parse(dadosAtuais) : {};

      salas[dia] = novaSala;

      await AsyncStorage.setItem('salas', JSON.stringify(salas));

      Alert.alert('Sala cadastrada com sucesso!');

      setDia('');
      setSalaManha('');
      setSalaTarde('');

      router.back();
    } catch (error) {
      Alert.alert('Erro ao salvar');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Sala Livre</Text>

      <TextInput
        placeholder="Dia da semana (ex: Segunda)"
        placeholderTextColor="#999"
        style={styles.input}
        value={dia}
        onChangeText={setDia}
      />

      <TextInput
        placeholder="Sala da manhã"
        placeholderTextColor="#999"
        style={styles.input}
        value={salaManha}
        onChangeText={setSalaManha}
      />

      <TextInput
        placeholder="Sala da tarde"
        placeholderTextColor="#999"
        style={styles.input}
        value={salaTarde}
        onChangeText={setSalaTarde}
      />

      <TouchableOpacity style={styles.botao} onPress={salvarSala}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center'
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center'
  },

  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16
  },

  botao: {
    backgroundColor: '#FF0090',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },

  botaoVoltar: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});