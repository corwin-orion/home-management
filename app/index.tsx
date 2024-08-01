import React, { useState } from 'react';
import { StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import PageContainer from '@/components/PageContainer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      router.navigate('/households');
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <KeyboardAvoidingView style={styles.container}>
        <TextInput style={styles.input} value={email} placeholder='Email' onChangeText={(text) => setEmail(text)} autoCapitalize='none' />
        <TextInput style={styles.input} value={password} placeholder='Password' onChangeText={(text) => setPassword(text)} autoCapitalize='none' secureTextEntry />
        {loading ? <ActivityIndicator size='large' color='black' /> :
          <>
            <Button title='Login' onPress={() => handleLogin()} />
            <Button title='Create account' onPress={() => handleSignup()} />
          </>
        }
      </KeyboardAvoidingView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  }
});