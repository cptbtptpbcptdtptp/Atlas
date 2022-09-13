import { PackingContext } from "../interface/PackingContext";
import { ErrorCode } from "../enum/ErrorCode";
import { OptHandler } from "./OptHandler";

export class OptLoadImage extends OptHandler {
  parse(context: PackingContext): Promise<ErrorCode> {
    return new Promise<ErrorCode>((resolve, reject) => {
      const { images } = context;
      // 第一步：加载所有的图片
      const imagesLength = images.length;
      if (imagesLength < 0) {
        reject(ErrorCode.NoImage);
        return;
      }
      const promiseArray: Promise<HTMLImageElement>[] = [];
      for (let i = 0; i < imagesLength; i++) {
        const image = images[i];
        let promise: Promise<HTMLImageElement>;
        const imageSrc = image.src;
        if (imageSrc instanceof ArrayBuffer) {
          promise = this._loadImageFromArrayBuffer(imageSrc, image.type);
        } else {
          if (imageSrc.substring(0, 5) === "data:") {
            promise = this._loadImageFromBase64(imageSrc);
          } else {
            promise = this._loadImageFromURL(imageSrc);
          }
        }
        promiseArray.push(promise);
      }
      Promise.all(promiseArray)
        .then((imageElement: HTMLImageElement[]) => {
          for (let i = 0; i < imagesLength; i++) {
            images[i].image = imageElement[i];
          }
          resolve(ErrorCode.Success);
          return;
        })
        .catch((error: Error) => {
          console.error("OptLoadImage:Error", JSON.stringify(error));
          reject(ErrorCode.ImageLoadError);
          return;
        });
    });
  }

  private _loadImageFromArrayBuffer(
    buffer: ArrayBuffer,
    type: string
  ): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const blob = new window.Blob([buffer], { type });
      const img = new Image();
      img.onerror = function () {
        reject(new Error("Failed to load image buffer"));
      };
      img.onload = function () {
        // Call requestAnimationFrame to avoid iOS's bug.
        requestAnimationFrame(() => {
          resolve(img);
          img.onload = null;
          img.onerror = null;
          img.onabort = null;
        });
      };
      img.src = URL.createObjectURL(blob);
      img.crossOrigin = "anonymous";
    });
  }

  private _loadImageFromBase64(base64: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onerror = function () {
        reject(new Error("Failed to load image buffer"));
      };
      img.onload = function () {
        // Call requestAnimationFrame to avoid iOS's bug.
        requestAnimationFrame(() => {
          resolve(img);
          img.onload = null;
          img.onerror = null;
          img.onabort = null;
        });
      };
      img.crossOrigin = "anonymous";
      img.src = base64;
    });
  }

  private _loadImageFromURL(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onerror = function () {
        console.error("加载资源失败");
        reject(new Error("Failed to load image buffer"));
      };
      img.onload = function () {
        // Call requestAnimationFrame to avoid iOS's bug.
        requestAnimationFrame(() => {
          resolve(img);
          img.onload = null;
          img.onerror = null;
          img.onabort = null;
        });
      };
      img.src = url;
      img.crossOrigin = "anonymous";
    });
  }
}
