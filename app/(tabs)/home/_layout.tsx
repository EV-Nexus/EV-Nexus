import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            headerTitle: "EV Nexus",
            headerLargeTitle: true,
            headerShadowVisible: false,
        }} />
    </Stack>
  )
}

export default Layout