import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE } from '@/FirebaseConfig';
import { router } from 'expo-router';
import PageContainer from '@/components/PageContainer';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Household } from '@/constants/Types';
import { ThemedText } from '@/components/ThemedText';
import MenuItem from '@/components/MenuItem';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSession } from '@/contexts/SessionContext';

export default function Login() {
  const [households, setHouseholds] = useState<Household[]>([]);
  const { user, setUser } = useSession();

  useEffect(() => {
    const getHouseholds = async () => {
      try {
        // Create a query to get the households with the user's ID in their members list.
        const householdRef = collection(FIRESTORE, 'households');
        const q = query(householdRef, where('ownerId', '==', FIREBASE_AUTH.currentUser?.uid));

        const householdSnapshot = await getDocs(q);
        const householdList = householdSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Household));

        // Do something with the household list
        setHouseholds(householdList);
        console.log(householdList);
      } catch (error) {
        console.error("Error getting households: ", error);
      }
    };

    getHouseholds();
  }, []);

  return (
    <PageContainer style={{ gap: 10 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          FIREBASE_AUTH.signOut();
          router.navigate('/');
        }}>
          <Feather name='log-out' size={24} color='black' />
        </TouchableOpacity>
        <View style={styles.nameContainer}>
          <ThemedText type='subtitle' style={{ color: user?.color }}>{user?.name}</ThemedText>
          <View style={styles.nameButtonsContainer}>
            <TouchableOpacity onPress={() => { }}>
              <Feather name='edit' size={24} color='black' />
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
      </View>
      <ThemedText type='title' style={{ textAlign: 'center' }}>Select household:</ThemedText>
      {households.map(household => (
        <MenuItem key={household.id}>
          <ThemedText type='subtitle'>{household.name}</ThemedText>
        </MenuItem>
      ))}
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameButtonsContainer: {
    flexDirection: 'row',
    gap: 3,
  }
});
