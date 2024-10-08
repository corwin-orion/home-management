import React, { useState } from 'react';
import { StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import { auth } from '@/private/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import PageContainer from '@/components/PageContainer';
import { useSession } from '@/contexts/SessionContext';
import { getUser } from '@/helpers/getUser';
import { globalStyles } from '@/constants/Styles';
import { User } from '@/constants/Types';
import ThemedInput from '@/components/ThemedInput';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useSession();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userResponse: User | null = await getUser();
      if (userResponse) {
        setUser(userResponse);
        router.navigate('/households');
      }
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

  const activityIndicatorColor = useThemeColor({}, 'icon')

  return (
    <PageContainer>
      <KeyboardAvoidingView style={styles.container}>
        <ThemedInput value={email} placeholder='Email' onChangeText={(text) => setEmail(text)} autoCapitalize='none' />
        <ThemedInput value={password} placeholder='Password' onChangeText={(text) => setPassword(text)} autoCapitalize='none' secureTextEntry />
        {loading ? <ActivityIndicator size='large' color={activityIndicatorColor} /> :
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
  }
});