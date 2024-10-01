import React, { useEffect, useState } from 'react';
import { TextInput, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { auth, db } from '@/private/FirebaseConfig';
import { router } from 'expo-router';
import PageContainer from '@/components/PageContainer';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Household } from '@/constants/Types';
import { ThemedText } from '@/components/ThemedText';
import MenuItem from '@/components/MenuItem';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSession } from '@/contexts/SessionContext';
import { globalStyles } from '@/constants/Styles';
import FeatherButton from '@/components/FeatherButton';

export default function Login() {
  const { user, updateUser, setHousehold } = useSession();
  const [households, setHouseholds] = useState<Household[]>([]);
  const [showNameModal, setShowNameModal] = useState(false);
  const [newName, setNewName] = useState(user?.name);

  useEffect(() => {
    const getHouseholds = async () => {
      try {
        // Create a query to get the households with the user's ID in their members list.
        const householdRef = collection(db, 'households');
        const q = query(householdRef, where('ownerId', '==', auth.currentUser?.uid));

        const householdSnapshot = await getDocs(q);
        const householdList = householdSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Household));

        // Do something with the household list
        setHouseholds(householdList);
        console.log('List of households in db:', householdList);
      } catch (error) {
        console.error("Error getting households: ", error);
      }
    };

    getHouseholds();
  }, []);

  const handleNameChange = () => {
    if (!user) return;
    const name: string = newName || user.name;
    updateUser(name, user.color);
  }

  return (
    <PageContainer style={{ gap: 10 }}>
      <View style={styles.header}>
        <FeatherButton
          icon='log-out'
          onPress={() => {
            auth.signOut();
            router.navigate('/');
          }} />
        <View style={styles.nameContainer}>
          <ThemedText type='subtitle' style={{ color: user?.color }}>{user?.name}</ThemedText>
          <View style={styles.nameButtonsContainer}>
            <FeatherButton
              icon='edit'
              onPress={() => setShowNameModal(true)} />
          </View>
        </View>
        {/* 👇 Extra view for spacing */}
        <View></View>
      </View>
      {/* Main content (households) */}
      <ThemedText type='title' style={{ textAlign: 'center' }}>Select household:</ThemedText>
      {households.map(household => (
        <MenuItem key={household.id} onPress={() => {
          console.log('Selected', household);
          setHousehold(household);
          router.navigate('/(tabs)');
        }}>
          <ThemedText type='subtitle'>{household.name}</ThemedText>
        </MenuItem>
      ))}
      {/* Name change modal */}
      <Modal visible={showNameModal} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setShowNameModal(false)}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <TouchableOpacity onPress={() => setShowNameModal(false)} style={{ alignSelf: 'flex-end' }}>
                  <Feather name='x' size={24} color='black' />
                </TouchableOpacity>
                <TextInput style={globalStyles.input} placeholder='New name' value={newName} onChangeText={(text) => setNewName(text)} />
                <TouchableOpacity onPress={() => {
                  handleNameChange();
                  setShowNameModal(false);
                }} style={{ alignSelf: 'flex-end' }}>
                  <Feather name='check' size={24} color='black' />
                </TouchableOpacity>
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
