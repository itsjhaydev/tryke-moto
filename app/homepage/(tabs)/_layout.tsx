import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { IconSymbol } from '../../../components/ui/IconSymbol';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    borderRadius: 50,
                    height: 70,
                    backgroundColor: '#fff',
                    paddingTop: 15,
                    margin: 5,
                },
                tabBarShowLabel: false,
            }}
        >
            {[
                { name: 'home', icon: 'house.fill' },
                { name: 'history', icon: 'history.fill' },
                { name: 'message', icon: 'message.fill' },
                { name: 'e-wallet', icon: 'account.balance.wallet' },
                { name: 'account', icon: 'person.fill' },
            ].map(({ name, icon }) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={{
                                    
                                    backgroundColor: focused ? '#337B09' : 'transparent',
                                    borderRadius: 50,
                                    width: 50,
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <IconSymbol size={28} name={icon} color={focused ? '#FFFFFF' : '#A0A0A0'} />
                            </View>
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
}
