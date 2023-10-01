import { useLoader } from "@react-three/fiber";
import { GeoLoader } from "../utils/GeoLoader";

type HoudiniGeoProps = Readonly<{
  src: string;
}>;

export function HoudiniGeo({ src }: HoudiniGeoProps) {
  const geometry = useLoader(GeoLoader, src);
  // eslint-disable-next-line functional/no-expression-statements
  console.log("component", geometry);
  return <primitive object={geometry} />;
}
