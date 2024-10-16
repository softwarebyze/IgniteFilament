import { Model } from "react-native-filament"

const modelPath =
  "https://raw.githubusercontent.com/google/filament/main/third_party/models/DamagedHelmet/DamagedHelmet.glb"

export const DamagedHelmetModel = () => <Model source={{ uri: modelPath }} transformToUnitCube />
