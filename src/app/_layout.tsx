import { Slot, SplashScreen } from "expo-router"
import { useEffect, useState } from "react"
import { ViewStyle } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { initI18n } from "@/i18n"
import { customFontsToLoad } from "@/theme"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { useFonts } from "@expo-google-fonts/space-grotesk"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}

export { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"

export default function Root() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={$root}>
      <Slot />
    </GestureHandlerRootView>
  )
}

const $root: ViewStyle = { flex: 1 }
