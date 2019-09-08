import ImageFillData from "./IImageFillData";

export default interface JobResult
{
    imageBytes: Uint8Array;
    fillData: ImageFillData;
}