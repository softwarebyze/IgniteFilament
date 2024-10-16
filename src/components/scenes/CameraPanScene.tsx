// https://margelo.github.io/react-native-filament/docs/guides/camera#the-camera-manipulator
import { PropsWithChildren } from "react"
import { Dimensions, StyleSheet } from "react-native"
import { Camera, DefaultLight, FilamentView, useCameraManipulator } from "react-native-filament"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { useSharedValue } from "react-native-worklets-core"

export function CameraPanScene({ children }: PropsWithChildren) {
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: [0, 0, 8], // "Camera location"
    targetPosition: [0, 0, 0], // "Looking at"
    orbitSpeed: [0.003, 0.003],
  })

  // Pan gesture
  const viewHeight = Dimensions.get("window").height
  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      const yCorrected = viewHeight - event.translationY
      // false means rotation instead of translation
      const isRotation = event.numberOfPointers !== 1
      cameraManipulator?.grabBegin(event.translationX, yCorrected, isRotation)
    })
    .onUpdate((event) => {
      const yCorrected = viewHeight - event.translationY
      cameraManipulator?.grabUpdate(event.translationX, yCorrected)
    })
    // .maxPointers(1)
    .onEnd(() => {
      cameraManipulator?.grabEnd()
    })

  // Scale gesture
  const previousScale = useSharedValue(1)
  const scaleMultiplier = 100
  const pinchGesture = Gesture.Pinch()
    .onBegin(({ scale }) => {
      previousScale.value = scale
    })
    .onUpdate(({ scale, focalX, focalY }) => {
      const delta = scale - previousScale.value
      cameraManipulator?.scroll(focalX, focalY, -delta * scaleMultiplier)
      previousScale.value = scale
    })
  const combinedGesture = Gesture.Race(pinchGesture, panGesture)

  return (
    <GestureDetector gesture={combinedGesture}>
      <FilamentView style={styles.container}>
        <Camera cameraManipulator={cameraManipulator} />
        <DefaultLight />
        {children}
      </FilamentView>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    flex: 1,
  },
})
