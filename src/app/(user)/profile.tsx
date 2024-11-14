import { supabase } from '@/lib/supabase';
import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';

const ProfileScreen = () => {
    const ButtonPressed = async () => {
        await supabase.auth.signOut();
    }
  return (
    <View>
      <Text>Profile</Text>

      <Button
        title="Sign out"
        onPress={ButtonPressed}
      />
    </View>
  );
};

export default ProfileScreen;