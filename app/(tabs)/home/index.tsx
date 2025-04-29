import { Image, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Text, useThemeColor, View } from '@/components/Themed';
import { useNavigation } from 'expo-router';



export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  
  // Theme Colors
  const backgroundColor = useThemeColor({
    light: '#fff',
    dark: '#000',
  }, 'background');
  const cardBgColor = useThemeColor({ light: '#fff', dark: '#333' }, 'background');
  const iconColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');

  const features = [
    {
      title: "Lease Electric Bikes",
      description: "Find affordable e-bikes with flexible daily payment options",
      icon: <MaterialCommunityIcons name="bike" size={24} color={iconColor} />,
      action: () => navigation.navigate("lease" as never),
    },
    {
      title: "Battery Swap Stations",
      description: "Find nearby stations to quickly swap your battery",
      icon: <MaterialIcons name="battery-charging-full" size={24} color={iconColor} />,
      action: () => navigation.navigate("battery" as never),
    },
    {
      title: "Trusted Repair Network",
      description: "Pre-negotiated repair services with verified garages",
      icon: <Ionicons name="construct" size={24} color={iconColor} />,
      action: () => navigation.navigate("repairs" as never),
    }
  ]

  const reasons = [
    {
      id: 1,
      title: "Lower Running Costs",
      description: "Save up to 60% on fuel and maintenance costs.",
      icon: <MaterialCommunityIcons name="currency-usd" size={30} color="green" />,
    },
    {
      id: 2,
      title: "No Emissions",
      description: "Cleaner air, healthier rides",
      icon: <MaterialCommunityIcons name="leaf" size={30} color="green" />,
    },
    {
      id: 3,
      title: "Less Maintenance",
      description: "Fewer moving parts means less wear and tear.",
      icon: <Ionicons name="construct" size={30} color="green" />,
    },
    {
      id: 4,
      title: "Mordern Technology",
      description: "Smart battery management and real-time diagnostics.",
      icon: <MaterialIcons name="smartphone" size={30} color="green" />,
    }
  ]

  return (
    <ScrollView 
    style={{ paddingTop: headerHeight, backgroundColor }} 
    className='px-4'
    >
      <View className="my-3 rounded-2xl overflow-hidden">
        <Image
          source={require("@/assets/images/heroimage.png")}
          style={{ width: '100%', height: 400 }}
          className="w-full h-[400px] rounded-2xl"
          resizeMode='cover'
        />
        <View 
          style={{ position: 'absolute', bottom: 0, width: '100%', padding: 16, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
        >
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>
            Switch to Electric Bikes
          </Text>
          <Text className="text-sm mb-2 text-white" style={{ fontSize: 14, color: 'white', marginTop: 4, marginBottom: 8 }}>
            Low daily payments, reliable charging, and affordable repairs
          </Text>
          <TouchableOpacity
            className="bg-emerald-500 py-3 rounded-lg items-center justify-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold">
              Lease a Bike Today
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-xl font-bold mb-2">Features</Text>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center p-4 rounded-lg shadow mb-2 gap-2"
            style={{ backgroundColor: cardBgColor }}
            onPress={feature.action}
            activeOpacity={0.7}
          >
            <View style={{ marginRight: 16,borderRadius: 50, padding: 8, backgroundColor: colorScheme === 'dark' ? '#444' : '#f0f0f0' }}>
              {feature.icon}
            </View>

            <View style={{ backgroundColor: 'transparent', flex: 1 }}>
              <Text className="text-lg font-semibold">{feature.title}</Text>
              <Text style={{ fontSize: 12, marginTop: 4, color: colorScheme === 'dark' ? '#ccc' : '#666' }}>	
                {feature.description}
              </Text>
            </View>

            <MaterialIcons name="chevron-right" size={28}  style={{ marginLeft: 'auto' }} color={iconColor} />
          </TouchableOpacity>
        ))}
      </View>

      <View className="mt-4">
        <Text className="text-xl font-bold mb-2">Why Switch to Electric?</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {reasons.map((reason) => (
            <View
              key={reason.id}
              className="p-4 rounded-lg shadow mb-2 gap-2"
              style={{ backgroundColor: cardBgColor, width: '48%' }}
            >
                <View style={{ 
                borderRadius: 50, 
                padding: 8, 
                backgroundColor: colorScheme === 'dark' ? '#444' : '#f0f0f0',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 'auto'
                }}>
                {reason.icon}
                </View>

              <View style={{ backgroundColor: 'transparent', flex: 1 }}>
                <Text className="text-lg font-semibold">{reason.title}</Text>
                <Text style={{ fontSize: 12, marginTop: 4, color: colorScheme === 'dark' ? '#ccc' : '#666' }}>
                  {reason.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

