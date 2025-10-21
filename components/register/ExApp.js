import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import EnterName from './EnterName';
import UploadPhoto from './UploadPhoto';
import About from './About';
import SkillInput from './SkillInput';
import UploadCertification from './UploadCertification';
import ChooseTopic from './ChooseTopic';
import UploadInfo from './UploadInfo';
import Login from '../login/login';
import ForgotPassword from '../login/ForgotPassword';
import { GestureHandlerRootView} from 'react-native-gesture-handler'
const Stack = createStackNavigator();

export default function ExApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="EnterName" 
          component={EnterName}
          options={{headerShown: false}} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="UploadPhoto" 
          component={UploadPhoto} 
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="About" 
          component={About} 
          options={{headerShown: false}}/>
        <Stack.Screen
          name="SkillInput"
          component={SkillInput}
          options={{headerShown: false}}/>
        <Stack.Screen
          name="UploadCertification"
          component={UploadCertification}
          options={{headerShown: false}}/>
        <Stack.Screen
          name="ChooseTopic"
          component={ChooseTopic}
          options={{headerShown: false}}/>
        <Stack.Screen
          name="UploadInfo"
          component={UploadInfo}
          options={{headerShown: false}}/>
      </Stack.Navigator>      
    </NavigationContainer>
  );
}

registerRootComponent(ExApp);