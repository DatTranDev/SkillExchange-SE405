import { SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '@constants';
import ScreenChatRoom from '../../components/message/chat_room/MainRoom';
const Room = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <ScreenChatRoom />
    </SafeAreaView>
  );
};

export default Room;
