/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-classes */
/* eslint-disable functional/prefer-immutable-types */

import { chunk, flatten, fromPairs, partition, pipe, zip } from "remeda";
import {
  BufferAttribute,
  BufferGeometry,
  FileLoader,
  Loader,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from "three";

export class GeoLoader extends Loader {
  constructor(manager: LoadingManager) {
    super(manager);
  }
  load(url: any, onLoad: any, onProgress: any, onError: any) {
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(
      url,
      (text: string | ArrayBuffer) => {
        onLoad(this.parse(text as string));
      },
      onProgress,
      onError
    );
  }
  parse(text: string) {
    const geoData = fromArrToObject(JSON.parse(text));

    return this.parseTopo(geoData);
  }

  parseTopo(data: Record<string, any>) {
    const topo = fromArrToObject(data["topology"]);
    const attributes = fromArrToObject(data["attributes"]);

    const { indices } = fromArrToObject(topo["pointref"] as []);

    const ptattributes = parseAttrList(attributes["pointattributes"] as []);
    const primattributes = parseAttrList(
      attributes["primitiveattributes"] as []
    );

    const geo = new BufferGeometry();

    // P attribute
    const vertices = new Float32Array(
      flatten(ptattributes["P"].map((e: Vector3) => e.toArray()))
    );

    geo.setIndex(indices as number[]);
    geo.setAttribute("position", new BufferAttribute(vertices, 3));

    console.log(indices, ptattributes, vertices);

    const material = new MeshBasicMaterial({ color: 0xff0000 });
    return new Mesh(geo, material);
  }
}

function fromArrToObject(kvarr: any[]) {
  return pipe(kvarr, (a) => chunk(a, 2) as [], fromPairs);
}

function parseAttrList(arrlist: any[]) {
  return arrlist.reduce((data, attribute) => {
    const [_meta, _content] = attribute as [any, any];

    const meta = fromArrToObject(_meta);
    const content = fromArrToObject(_content);

    const attr = parsePointAttribute(meta, content);
    data[attr.name] = attr.values;

    return data;
  }, {} as Record<string, any>);
}

function parsePointAttribute(
  meta: Record<string, any>,
  content: Record<string, any>
) {
  const _v = fromArrToObject(content["values"]);

  let values: number[] | Vector3[] = [];
  const { arrays, tuples } = _v;

  if (arrays) {
    values = (arrays as number[][])[0];
  }

  if (tuples) {
    values = (tuples as number[][]).map(
      (el) => new Vector3(el[0], el[1], el[2])
    );
  }

  return {
    name: meta.name,
    values,
  };
}
