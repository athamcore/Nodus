import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: '#888888',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="home" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="book" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="search" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="person" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ name, focused, color }: { name: string; focused: boolean; color: string }) {
  const size = focused ? 28 : 24;
  return <IconSymbol name={name} size={size} color={color} />;
}

function IconSymbol({ name, size, color }: { name: string; size: number; color: string }) {
  const symbols: Record<string, string> = {
    home: '🏠',
    book: '📚',
    search: '🔍',
    person: '👤',
  };
  return <Text style={{ fontSize: size, color }}>{symbols[name] || '❓'}</Text>;
}