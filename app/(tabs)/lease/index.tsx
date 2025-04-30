import { ScrollView, useColorScheme } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from 'expo-router';

import { Text, useThemeColor, View } from '@/components/Themed';
import AllModelsTab from './allModels';
import EconomyTab from './economy';
import PremiumTab from './premium';

const Tab = createMaterialTopTabNavigator();

export default function LeaseScreen() {
  const headerHeight = useHeaderHeight();


  // Theme Colors
  const backgroundColor = useThemeColor({
    light: '#fff',
    dark: '#000',
  }, 'background');


  return (
    <View style={{ flex: 1, paddingTop: headerHeight, backgroundColor }}>
        <Tab.Navigator>
          <Tab.Screen name="AllModels" component={AllModelsTab} options={{ title: 'All Models' }} />
          <Tab.Screen name="Economy" component={EconomyTab} options={{ title: 'Economy' }} />
          <Tab.Screen name="Premium" component={PremiumTab} options={{ title: 'Premium' }} />
        </Tab.Navigator>
    </View>
  );
}
