import html2canvas from "html2canvas";
import { MutableRefObject } from "react";

export async function getCanvasFromRef<T = HTMLElement>(
  refElement: MutableRefObject<T>,
  _scale = 5
) {
  const element = refElement.current as HTMLElement;
  const w = element.clientWidth;
  const h = element.clientHeight;

  const _canvas = document.createElement("canvas");
  _canvas.width = w * _scale;
  _canvas.height = h * _scale;
  _canvas.style.width = w + "px";
  _canvas.style.height = h + "px";

  const canvas = await html2canvas(element, {
    canvas: _canvas,
    scale: _scale,
    useCORS: true,
    allowTaint: true,
    width: w,
    height: h,
  });

  const ctx = canvas.getContext("2d") as any;
  ctx.scale(_scale, _scale);
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  return canvas;
}

export async function getImageDataURL<T = HTMLElement>(
  refElement: MutableRefObject<T>,
  imgName: string
) {
  try {
    const canvas = await getCanvasFromRef(refElement);
    const canvasImgUrl = canvas.toDataURL("image/png", 1);
    return canvasImgUrl;
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
}

export async function downloadImage<T = HTMLElement>(
  refElement: MutableRefObject<T>,
  imgName: string
) {
  const canvasImgUrl = await getImageDataURL(refElement, imgName);
  const linkElement = document.createElement("a");
  linkElement.download = imgName;
  linkElement.href = canvasImgUrl;
  linkElement.click();
}

export async function getImageBlob<T = HTMLElement>(
  refElement: MutableRefObject<T>,
  imgName: string
): Promise<File> {
  try {
    const canvas = await getCanvasFromRef(refElement);
    return new Promise((res, rej) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], imgName, { type: blob.type });
          res(file);
        }
        return rej(`Failed to convert Blob.`);
      });
    });
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
}
