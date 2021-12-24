import { allowedExtensionType, allowedExtensions } from '../data/allowedExtensions'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import { user } from '../models/user'
import { Image, ImageType } from '../models/file'
import { decodeJWT } from '../utils/decodejwt'
import { getUserFromToken } from '../utils/getuserfromdb'
const randomizeName = () => {
    return crypto.randomBytes(32).toString('hex')
}
const fileToHex = (buffer: Buffer) => {
    return buffer.toString('hex').substring(0, 4).toLowerCase()
}
const checkAgainstExtension = (arrayExt: allowedExtensionType[], FileHex: string): boolean => {
    return arrayExt.some((ext) => {
        return ext.hex == FileHex
    })
}
interface localSaveInterface {
    base64: string
    saveFile(string: string): Promise<Image>
}
const imageOptimization = (base64: string) => {   // Image Optimization
    //
}
export class saveLocalBase64 implements localSaveInterface {
    base64: string
    constructor(base64: string) {
        this.base64 = base64;
    }
    async saveFile(cookie: string) {

        if (checkAgainstExtension(allowedExtensions, fileToHex((Buffer.from(this.base64.split('base64,')[1], 'base64'))))) {
            console.log('passed the checks ')
            const token: any = decodeJWT(cookie)
            const currentUser = await getUserFromToken(token)
            const addIamge = await currentUser.createImage({
                name: randomizeName(),
                base64Encoding: this.base64,
                imageExt: this.base64.split('image/')[1].split(';base64')[0]
            })
            return addIamge
        }
        else {
            console.log('not passed')
        }
    }
}

export class saveAmazonbase64 {
    base64: string
    constructor(base64) {
        this.base64 = base64;
    }
    saveFile() {

        if (checkAgainstExtension(allowedExtensions, fileToHex((Buffer.from(this.base64.split('base64,')[1], 'base64'))))) {
            console.log('passed the checks ')
            // Amazon Save Implementation
        }
        else {
            console.log('not passed')
        }
    }
}
