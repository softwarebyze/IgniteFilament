import { Button, Screen, Text } from "@/components"
import { Scene } from "@/components/scenes/Scene"
import { colors, spacing } from "@/theme"
import { ViewStyle } from "react-native"
// models
import { DamagedHelmetModel } from "@/components/models/DamagedHelmetModel"
import { RocketModel } from "@/components/models/RocketModel"
import { useState } from "react"

const models = {
  RocketModel,
  DamagedHelmetModel,
}

type Model = keyof typeof models

export default function WelcomeScreen() {
  const [model, setModel] = useState<Model>("DamagedHelmetModel")
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text text="IgniteFilament" preset="heading" />
      <Scene>{models[model]()}</Scene>
      {Object.keys(models).map((key) => (
        <Button key={key} text={key} onPress={() => setModel(key as Model)} />
      ))}
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  padding: spacing.lg,
}
