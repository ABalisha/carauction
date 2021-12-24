import Compress from "compress.js";
export class imageCompressor {
  compress(id: string, size: number, quality: number) {
    new Compress().attach(id, {
      size: size,
      quality: quality
    })
  }
}