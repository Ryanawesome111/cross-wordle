import { Box, Camera, Point, Viewport } from "../types/canvas";
import { Config } from "./game";

export const Bounds = {
  minX: 0,
  minY: 0,
  maxX: Config.MaxLetters * Config.TileSize + Config.TileSpacing,
  maxY: Config.MaxLetters * Config.TileSize + Config.TileSpacing,
  minZ: 1,
  maxZ: 1.1,
};

export function getBox(): Box {
  const elm = document.querySelector("#canvas");
  if (elm) {
    const rect = elm.getBoundingClientRect();
    return {
      minX: rect.left - rect.x,
      minY: rect.top - rect.y,
      maxX: rect.right - rect.x,
      maxY: rect.bottom - rect.y,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  } else {
    return {
      minX: 0,
      minY: 0,
      maxX: window.innerWidth,
      maxY: window.innerHeight,
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
}

export function screenToCanvas(point: Point, camera: Camera): Point {
  return {
    x: point.x / camera.z - camera.x,
    y: point.y / camera.z - camera.y,
  };
}

export function canvasToScreen(point: Point, camera: Camera): Point {
  return {
    x: (point.x - camera.x) * camera.z,
    y: (point.y - camera.y) * camera.z,
  };
}

export function getViewport(camera: Camera, box: Box): Viewport {
  const topLeft = screenToCanvas({ x: box.minX, y: box.minY }, camera);
  const bottomRight = screenToCanvas({ x: box.maxX, y: box.maxY }, camera);

  return {
    minX: topLeft.x,
    minY: topLeft.y,
    maxX: bottomRight.x,
    maxY: bottomRight.y,
    height: bottomRight.y - topLeft.y,
    width: bottomRight.x - topLeft.x,
  };
}
