import { Model } from "react-native-filament"

export function RocketModel() {
  return (
    <Model
      source={{
        uri: "https://github.com/margelo/react-native-filament/raw/refs/heads/main/package/example/Shared/assets/rocket.glb",
      }}
      transformToUnitCube
    />
  )
}
