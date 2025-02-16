import axios from 'axios';
import {baseUrl} from './features/apis/apiSlice'

url = `${baseUrl}/edituser`


export const UserProfile = async (data) => {
    return axios.post(url, data.data, { headers:{
        'Content-Type': 'multipart/form-data',
        "Authorization": `Token ${data.token}`,
        }
    }).then(res => {
        return {
            data: res.data,
            success:true
        }
    }).catch(err => {
        return {
            type: 'Error',
            success:false,
            data: err.response.data,
            status: err.response.status
        }

    })
}