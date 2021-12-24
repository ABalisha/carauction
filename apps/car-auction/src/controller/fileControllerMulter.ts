
// export const uploadFile = (file: string, dest) => {
//     if (dest == 'amazon') {
//         return (req: Request, res: Response, next: NextFunction) => {
//             const amazonUpload = new uploadAmazon(process.env.imagePath as string)
//             amazonUpload.saveFile(file)

//         }
//     }
//     else if(dest == 'local') {
//         return (req: Request, res: Response, next: NextFunction) => {
//             try {
//                 const localUpload = new uploadLocal(process.env.imagePath as string)
//                  return localUpload.saveFile(file)
//             }
//             catch (e) {
//                 res.send('Error Uploading File');
//             }
//         }
//     }
// }
import { fileType } from "../services/fileUploadMulter";
import { uploadLocally, AmazonUpload } from "../services/fileUploadMulter";
export const uploadFile = (filename: string | fileType | File,dest:string) => {
    if(dest == "local") 
    {
    return new uploadLocally(process.env.imagePath as string).saveFile(filename as string)
 
    }
    else {
  new AmazonUpload(process.env.imagePath as string, "TestBucket", "SanFrancisco", "AccessKeyID", "SecretAccessKey").saveFile(filename as fileType, "testBucket")
    }
}


