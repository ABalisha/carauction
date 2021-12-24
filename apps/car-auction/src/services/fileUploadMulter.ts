import { RequestHandler } from "express";
import * as multer from "multer";
import S3 from "aws-sdk/clients/s3";

// const bucketName = process.env.bucketName;
// const region = process.env.bucketRegion;
// const accessKeyId = process.env.accessKeyID;
// const secretAccessKey = process.env.secretAccesKey;

// const s3Instance = new S3({
//   region,
//   accessKeyId,
//   secretAccessKey,
// });

/// Upload file to bucket
export type fileType = {
    filename: string;
    buffer: Buffer;
};
interface uploadInterface {
    upload: multer.Multer;
    saveFile(
        file: string | fileType,
        bucketName?: string
    ): RequestHandler | Promise<object>;
}

export class uploadLocally implements uploadInterface {
    upload: multer.Multer;
    constructor(uploadDir: string) {
        this.upload = multer({ dest: `${__dirname}${uploadDir}` });
    }
    saveFile(file_name: string) {
        console.log(file_name);
        return this.upload.single(file_name);
    }
}
export class AmazonUpload implements uploadInterface {
    upload: multer.Multer;
    s3: S3;
    constructor(
        uploadDir: string,
        bucketName: string,
        region: string,
        accessKeyId: string,
        secretAccessKey: string
    ) {
        this.upload = multer({ dest: `${uploadDir}` });
        this.s3 = new S3({
            region,
            accessKeyId,
            secretAccessKey,
        });
    }
    saveFile(file: fileType, bucketName: string): Promise<object> {  // method return type Promise<S3.ManagedUpload>
        return this.s3
            .upload({ Bucket: bucketName, Body: file, Key: file.filename })
            .promise();
        //
    }
}
