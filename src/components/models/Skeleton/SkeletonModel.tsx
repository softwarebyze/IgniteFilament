import { Model } from "react-native-filament"
// @ts-ignore (ts is saying that it can't find the file)
import SkeletonGlb from "./skeleton.glb"

export function SkeletonModel() {
  return <Model source={SkeletonGlb} transformToUnitCube />
}
