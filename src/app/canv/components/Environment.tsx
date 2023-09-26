import {
  DIRECTIONAL_LIGHT_POS,
  GRID_CELL_COLOR,
  GRID_FADE_DIST,
} from "@/app/constants";
import { Grid } from "@react-three/drei";

export function Environment() {
  return (
    <>
      <directionalLight position={DIRECTIONAL_LIGHT_POS} />
      <Grid
        infiniteGrid
        cellColor={GRID_CELL_COLOR}
        fadeDistance={GRID_FADE_DIST}
      />
    </>
  );
}
