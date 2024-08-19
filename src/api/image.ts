import axios from "axios"
import { cloud } from "../constant"

export async function uploadImage(image: File) {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'fabrich')

    const res = await axios.post(cloud, data)
    .then(res => res.data)
    .catch(() => alert('something wrong !'))

    return res.secure_url
}