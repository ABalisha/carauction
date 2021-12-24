import { statusCodes } from "../data/statuscode";
import { UploadedFile } from "express-fileupload";
import { Request, Response } from 'express'
import { allowedExtensions } from '../data/allowedExtensions'
import { FileSaver } from "../utils/file";
import * as sharp from 'sharp'
import { extractExtension, fileToHex, checkAgainstExtension } from "../utils/file";
export const fileController = (req: Request, res: Response) => {
    try {
        if (req.files) {
            const dummyFile = req.files.dummyFile as UploadedFile;
            console.log(dummyFile.data)
            const buffer = sharp(dummyFile.data).toFormat('webp').toFile('OutputFile.jpg')
            if (checkAgainstExtension(allowedExtensions, extractExtension(dummyFile), fileToHex(dummyFile))) {
                console.log(process.env.imagePath)
                const filef = new FileSaver(process.env.imagePath as string)
                console.log("before save")
                filef.saveFile(dummyFile)
                console.log("after save")
                res.status(statusCodes.ok.status).json({ message: statusCodes.ok.message });
            }
            else {
                res.status(statusCodes.Forbidden.status).json(statusCodes.Forbidden.message);
            }
        }
    }
    catch (e) {
        console.log(e)
        res.status(statusCodes.BadRequest.status).json(statusCodes.BadRequest.message);
    }

}

            // async anotherClassMet() {
                    //     return await this.anotherClass.anotherClassMethod(dummyFile)
                    // }
            //     class mockFileSaver implements FileSaverInterface {
            //         location1 = "/src/images"
            //         constructor() { }

            //         async saveFile(file1: UploadedFile): Promise<void> {
            //             return file1.mv(this.location1 + file1.name)
            //         }
            //     }
            //     class AnotherClassMock implements AnotherClassInterface {
            //         location1 = "/src/images"
            //         constructor() { }
            //         async anotherClassMethod(file1: UploadedFile): Promise<void> {

            //         }
            //     }

