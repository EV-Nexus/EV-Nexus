import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            headerTitle: "Lease an Electric Bike",
            headerLargeTitle: true,
            headerShadowVisible: false,
        }} />
    </Stack>
  )
}

export default Layout