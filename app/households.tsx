import React, { useEffect, useState } from 'react';
import { TextInput, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE } from '@/FirebaseConfig';
import { router } from 'expo-router';
import PageContainer from '@/components/PageContainer';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Household } from '@/constants/Types';
import { ThemedText } from '@/components/ThemedText';
import MenuItem from '@/components/MenuItem';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSession } from '@/contexts/SessionContext';
import { globalStyles } from '@/constants/Styles';

export default function Login() {
  const { user, setUser } = useSession();
  const [households, setHouseholds] = useState<Household[]>([]);
  const [showNameModal, setShowNameModal] = useState(false);
  const [newName, setNewName] = useState(user?.name);

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
            <TouchableOpacity onPress={() => setShowNameModal(true)}>
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
      <Modal visible={showNameModal} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setShowNameModal(false)}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <TouchableOpacity onPress={() => setShowNameModal(false)} style={{ alignSelf: 'flex-end' }}>
                  <Feather name='x' size={24} color='black' />
                </TouchableOpacity>
                <TextInput style={globalStyles.input} placeholder='New name' value={newName} onChangeText={(text) => setNewName(text)} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 'auto',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
});
