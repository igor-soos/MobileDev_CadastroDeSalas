import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Cadastro() {
  const router = useRouter();

  const [dia, setDia] = useState('');
  const [salaManha, setSalaManha] = useState('');
  const [salaTarde, setSalaTarde] = useState('');

  function salvarSala() {
    console.log({
      dia,
      salaManha,
      salaTarde
    });

    alert('Sala cadastrada com sucesso!');

    setDia('');
    setSalaManha('');
    setSalaTarde('');
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
        placeholder="Sala da manhã (até 12h)"
        placeholderTextColor="#999"
        style={styles.input}
        value={salaManha}
        onChangeText={setSalaManha}
      />

      <TextInput
        placeholder="Sala da tarde (12h às 18h)"
        placeholderTextColor="#999"
        style={styles.input}
        value={salaTarde}
        onChangeText={setSalaTarde}
        />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarSala}
      >
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
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
    backgroundColor: '#F57726',
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