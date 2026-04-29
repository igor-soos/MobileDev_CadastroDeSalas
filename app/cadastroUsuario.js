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

export default function CadastroUsuario() {
  const router = useRouter();
  const { register } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [erroNome, setErroNome] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroConfirmar, setErroConfirmar] = useState('');
  const [erroCadastro, setErroCadastro] = useState('');

  function validarCampos(
    nomeValue,
    emailValue,
    senhaValue,
    confirmarValue
  ) {
    let nomeErro = '';
    let emailErro = '';
    let senhaErro = '';
    let confirmarErro = '';

    if (!nomeValue.trim()) {
      nomeErro = 'O nome completo é obrigatório';
    }

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

    if (!confirmarValue.trim()) {
      confirmarErro = 'Confirme sua senha';
    } else if (senhaValue !== confirmarValue) {
      confirmarErro = 'As senhas não coincidem';
    }

    setErroNome(nomeErro);
    setErroEmail(emailErro);
    setErroSenha(senhaErro);
    setErroConfirmar(confirmarErro);

    return !nomeErro && !emailErro && !senhaErro && !confirmarErro;
  }

  function handleNome(text) {
    setNome(text);
    validarCampos(text, email, senha, confirmarSenha);
  }

  function handleEmail(text) {
    setEmail(text);
    validarCampos(nome, text, senha, confirmarSenha);
  }

  function handleSenha(text) {
    setSenha(text);
    validarCampos(nome, email, text, confirmarSenha);
  }

  function handleConfirmar(text) {
    setConfirmarSenha(text);
    validarCampos(nome, email, senha, text);
  }

  const formularioValido =
    nome.trim() &&
    email.trim() &&
    senha.trim() &&
    confirmarSenha.trim() &&
    !erroNome &&
    !erroEmail &&
    !erroSenha &&
    !erroConfirmar;

  async function handleCadastro() {
    if (
      !validarCampos(
        nome,
        email,
        senha,
        confirmarSenha
      )
    ) return;

    const resultado = await register(nome, email, senha);

    if (!resultado.success) {
      setErroCadastro(resultado.message);
      return;
    }

    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>

      <TextInput
        placeholder="Nome completo"
        placeholderTextColor="#999"
        style={styles.input}
        value={nome}
        onChangeText={handleNome}
      />
      {erroNome ? <Text style={styles.erro}>{erroNome}</Text> : null}

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

      <TextInput
        placeholder="Confirmar senha"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        value={confirmarSenha}
        onChangeText={handleConfirmar}
      />
      {erroConfirmar ? (
        <Text style={styles.erro}>{erroConfirmar}</Text>
      ) : null}

      {erroCadastro ? (
        <Text style={styles.erro}>{erroCadastro}</Text>
      ) : null}

      <TouchableOpacity
        style={[
          styles.botao,
          !formularioValido && styles.botaoDesabilitado
        ]}
        onPress={handleCadastro}
        disabled={!formularioValido}
      >
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>
          Já possui conta? Voltar ao login
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
    fontSize: 30,
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