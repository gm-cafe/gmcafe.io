import {createRef, RefObject } from 'react';
import type {Node as KonvaNodeType} from 'konva/lib/Node';
import type {Image as KonvaImageType} from 'konva/lib/shapes/Image';

const DEG2RAD = Math.PI / 180;

export type Asset = {
  id: string,
  img: HTMLImageElement;
  imageRef: RefObject<KonvaImageType>;
  init?: ((image: KonvaImageType) => void);
};

export function isTopNode(node: KonvaNodeType): boolean {
  return node.zIndex() === node.getParent()?.getChildren().length-1; // konva ts bug
}

export function randomId(length: number = 16): string {
  return Array.from({length}, () => (Math.random() * 36|0).toString(36)).join('');
}

export async function assetFromJSON(layer: any): Promise<Asset> {
  const { url, x, y, scale, rot, flip } = layer;
  const img = url instanceof HTMLImageElement ? url : await loadImage(url);
  const asset: Asset = {
    id: randomId(),
    img,
    init(image) {
      image.image(flip ? flipImage(img) : img);
      image.x(x);
      image.y(y);
      image.offsetX(Math.round(img.width / 2));
      image.offsetY(Math.round(img.height / 2));
      image.scaleX(scale);
      image.scaleY(scale);
      image.rotation(rot);
    },
    imageRef: createRef(),
  };
  return asset;
}

export function flipImage(img: HTMLImageElement): HTMLCanvasElement {
  const {width, height} = img;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!; /// reeeeee
  ctx.scale(-1, 1);
  ctx.drawImage(img, -width, 0);
  return canvas;
}

export async function dataURIFromBlob(blob: Blob): Promise<string> {
  return new Promise(ful => {
    let r = new FileReader();
    r.onload = () => ful(r.result as string); // reeeeee
    r.readAsDataURL(blob);
  });
}

export async function dataURIFromImage(img: HTMLImageElement): Promise<string> {
  let {src} = img;
  if (!src.startsWith('blob:')) return src;
  let {width, height} = img;
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d')!; // reee
  ctx.drawImage(img, 0, 0);
  let blob = await new Promise(ful => canvas.toBlob(ful)); // reeeeee
  return dataURIFromBlob(blob as Blob);
}

export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((ful, rej) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.addEventListener('load', () => {
      img.removeEventListener('error', rej);
      ful(img);
    });
    img.addEventListener('error', rej);
    img.src = url;
  });
}
