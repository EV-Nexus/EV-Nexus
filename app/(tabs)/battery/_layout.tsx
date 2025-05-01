import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            headerTitle: "Battery Swap Stations",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerSearchBarOptions: {
              placeholder: "Search by location or station name",
              hideWhenScrolling: false,
            },
        }} />
    </Stack>
  )
}

export default Layout