import { user } from '../../../models/user'

export const checkGoogle = async (googleID: string): Promise<boolean> => {
    const res = await user.findOne({
        where: {
            GoogleID: googleID
        }
    })
    if (res == null) {
        return false;
    }
    else {
        return false;
    }


}
