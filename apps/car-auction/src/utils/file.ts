import { UploadedFile } from "express-fileupload";
import * as crypto from 'crypto'
import { allowedExtensionType } from '../data/allowedExtensions'
import * as sharp from 'sharp'
export const extractExtension = (file: UploadedFile) => {
    return file.name.split('.')[1].toLowerCase()
}
export const fileToHex = (file: UploadedFile) => {
    return file.data.toString('hex').substring(0, 4).toLowerCase()
}
export const checkAgainstExtension = (arrayExt: allowedExtensionType[], fileExtension: string, FileHex: string): boolean => {
    return arrayExt.some((ext) => {
        return ext.name == fileExtension && ext.hex == FileHex
    })
}
export const randomizeName = () => {
    return crypto.randomBytes(32).toString('hex')
}
export interface FileSaverInterface {
    location1: string
    saveFile(file2: UploadedFile): Promise<void>
}
export class FileSaver implements FileSaverInterface {
    location1;
    constructor(location1: string) {
        this.location1 = location1
    }
    saveFile(file1: UploadedFile) {

        // Image optimazation and save
        return file1.mv(__dirname + this.location1 + randomizeName() + '.' + file1.name.split('.')[1])
    }
}

export class AnotherClass implements FileSaverInterface {
    location1;
    constructor(location1: string) {
        this.location1 = location1
    }
    saveFile(file1: UploadedFile) {
        return file1.mv(this.location1 + file1.name)
    }
}