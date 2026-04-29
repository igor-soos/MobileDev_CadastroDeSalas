import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  function validarCampos(emailValue, senhaValue) {
    let emailErro = '';
    let senhaErro = '';

    if (!emailValue.trim()) {
      emailErro = 'O e-mail é obrigatório';
    } else if (!emailValue.includes('@')) {
      emailErro = 'Formato de e-mail inválido';
    }

    if (!senhaValue.trim()) {
      senhaErro = 'A senha é obrigatória';
    } else if (senhaValue.length < 6) {
      senhaErro = 'Senha deve ter no mínimo 6 caracteres';
    }

    setErroEmail(emailErro);
    setErroSenha(senhaErro);

    return !emailErro && !senhaErro;
  }

  function handleEmail(text) {
    setEmail(text);
    validarCampos(text, senha);
  }

  function handleSenha(text) {
    setSenha(text);
    validarCampos(email, text);
  }

  const formularioValido =
    email.trim() &&
    senha.trim() &&
    !erroEmail &&
    !erroSenha;

  async function handleLogin() {
    if (!validarCampos(email, senha)) return;

    const resultado = await login(email, senha);

    if (!resultado.success) {
      setErroLogin(resultado.message);
      return;
    }

    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={handleEmail}
      />
      {erroEmail ? <Text style={styles.erro}>{erroEmail}</Text> : null}

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={handleSenha}
      />
      {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null}

      {erroLogin ? <Text style={styles.erro}>{erroLogin}</Text> : null}

      <TouchableOpacity
        style={[
          styles.botao,
          !formularioValido && styles.botaoDesabilitado
        ]}
        onPress={handleLogin}
        disabled={!formularioValido}
      >
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/cadastroUsuario')}
      >
        <Text style={styles.link}>
          Não tem conta? Cadastre-se
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30
  },

  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
    fontSize: 16
  },

  erro: {
    color: '#fc1d1d',
    marginBottom: 10,
    fontSize: 14
  },

  botao: {
    backgroundColor: '#FF0090',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  link: {
    color: '#FF0090',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15
  },

  botaoDesabilitado: {
    opacity: 0.5
}
});