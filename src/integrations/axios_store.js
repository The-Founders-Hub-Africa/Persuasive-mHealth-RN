import axios from 'axios';
import {baseUrl} from './features/apis/apiSlice'


export const get_id = (param) => param.id
export const get_name = (param) => param.name

export const convertDate = (dateStr) => {
    const months = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    
    const [day, month, year] = dateStr.split('/');
    return `${year}-${months[month]}-${day.padStart(2, '0')}`;
};

let user_url = `${baseUrl}/edituser`
let appointments_url = `${baseUrl}/event`
let patient_url = `${baseUrl}/patient`

const base64ToBlob = (base64, type) => {
        const binary = atob(base64.split(',')[1]);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
    }
    
        return new Blob([new Uint8Array(array)], { type });
    };

const createForm = (data,blob_name) => {    
    let needed = data.data

    let formdata = new FormData()
        
        for (const [key, value] of Object.entries(needed.formdata)) {
            if (key == blob_name && value) {
                let first_four = value.slice(0, 4);
                if (first_four !== 'http') { 
                    let blob = base64ToBlob(value, needed.img.type)
                    formdata.append(key, blob,needed.img.filename)
                }
                
            // formdata.append(key, value,needed.img.filename)
            } else if (key != blob_name) {
                if(key != 'name'){ formdata.append(key,value)}
           
          }
    }
    return formdata
}


export const UserProfile = async (data) => {

    let formdata = createForm(data,'image')
    return axios.post(user_url, formdata, { headers:{
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

export const Appointments = async (data) => {

    let formdata = createForm(data, 'document')
    return axios.post(appointments_url,formdata, { headers:{
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

export const Patients = async (data) => {

    let formdata = createForm(data, 'document')
    return axios.post(patient_url,formdata, { headers:{
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



export const axiosGetMediaFile = async (file_id,token) => {
    const imageUrl = `${baseUrl}/platforms/get_media/${file_id}`;
    return axios.get(imageUrl, {
        responseType: 'blob',
        headers: {
            'Authorization': `Token ${token}`
        }
        
     }).then(res => {
        return {
            data: res.data,
            success: true
        }
    }).catch(err => {
        return {
            success: false,
            data: err.data,
            status: err.status
        }
    });
}
