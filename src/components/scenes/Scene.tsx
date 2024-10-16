import { PropsWithChildren } from "react"
import { FilamentScene } from "react-native-filament"
import { CameraPanScene } from "./CameraPanScene"

export const Scene = ({ children }: PropsWithChildren) => (
  <FilamentScene>
    <CameraPanScene>{children}</CameraPanScene>
  </FilamentScene>
)
