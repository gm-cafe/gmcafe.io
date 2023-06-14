import { createRef, RefObject } from 'react';
import type { Node as KonvaNodeType } from 'konva/lib/Node';
import type { Image as KonvaImageType } from 'konva/lib/shapes/Image';

export type Asset = {
  id: string;
  img: HTMLImageElement;
  imageRef: RefObject<KonvaImageType>;
  init?: (_image: KonvaImageType) => void;
};

export function isTopNode(node: KonvaNodeType): boolean {
  return node.zIndex() === node.getParent()?.getChildren().length - 1; // konva ts bug
}

export function* forEachNode(node: KonvaNodeType): KonvaNodeType {
  yield node;
  let children = node.getChildren?.();
  if (children) {
    for (let x of children) {
      yield* forEachNode(x);
    }
  }
}

export function downscaleImage(
  imageLike: HTMLImageElement | HTMLCanvasElement,
  width: number,
  height: number
): HTMLCanvasElement {
  let { width: w, height: h } = imageLike;
  while (true) {
    w = Math.max(width, Math.round(w / 2));
    h = Math.max(height, Math.round(h / 2));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(imageLike, 0, 0, w, h);
    if (width === w && h === height) return canvas;
    imageLike = canvas;
  }
}

export function randomId(length: number = 16): string {
  return Array.from({ length }, () => ((Math.random() * 36) | 0).toString(36)).join('');
}

export async function assetFromJSON(layer: any): Promise<Asset> {
  const { url, x, y, scale, rot, opacity, flip } = layer;
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
      image.opacity(opacity ?? 1);
      image.rotation(rot);
    },
    imageRef: createRef(),
  };
  return asset;
}

export async function JSONFromAsset(asset: Asset): Promise<any> {
  const { img, imageRef } = asset;
  const image = imageRef.current!;
  return {
    url: await dataURIFromImage(img),
    x: image.x(),
    y: image.y(),
    scale: image.scaleX(),
    rot: image.rotation(),
    flip: image.image() !== img,
    opacity: image.opacity(),
  };
}

export function flipImage(img: HTMLImageElement): HTMLCanvasElement {
  const { width, height } = img;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!; /// reeeeee
  ctx.scale(-1, 1);
  ctx.drawImage(img, -width, 0);
  return canvas;
}

export async function dataURIFromBlob(blob: Blob): Promise<string> {
  return new Promise((ful) => {
    const r = new FileReader();
    r.onload = () => ful(r.result as string); // reeeeee
    r.readAsDataURL(blob);
  });
}

export async function dataURIFromImage(img: HTMLImageElement): Promise<string> {
  const { src } = img;
  if (!src.startsWith('blob:')) return src;
  const { width, height } = img;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!; // reee
  ctx.drawImage(img, 0, 0);
  const blob = await new Promise((ful) => canvas.toBlob(ful)); // reeeeee
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
