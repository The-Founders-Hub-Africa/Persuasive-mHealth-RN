import axios from 'axios';
import {baseUrl} from './features/apis/apiSlice'


export const convertDate = (dateStr) => {
    const months = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    
    const [day, month, year] = dateStr.split('/');
    return `${year}-${months[month]}-${day.padStart(2, '0')}`;
};

url = `${baseUrl}/edituser`

let form = new FormData()

const createForm = (data) => {
//  const imageFiled = {
//               name: imageDetails.filename,
//               uri: value,
//               type: imageDetails.type
//             }
//      let data_ = {
//       token: user.usertoken,
//       data: {
//         formdata: data,
//         img: imageDetails
//        }
//     }
    //     console.log('createForm',data.formdata)
    
    let needed = data.data
    
    let formdata = new FormData()
        
        for (const [key, value] of Object.entries(needed.formdata)) {
          if (key == 'image' && value) {
          
            formdata.append(key, value,needed.img.filename)
          } else if (key !='image'){
            formdata.append(key,value)
          }
    }
    
    console.log(formdata)
    return formdata
}


export const UserProfile = async (data) => {

    let formdata = createForm(data)
    return axios.post(url, formdata, { headers:{
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