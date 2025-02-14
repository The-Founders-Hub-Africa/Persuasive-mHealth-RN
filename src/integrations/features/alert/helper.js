export const get_message_and_code = (data) => {
    console.log(data)
    let result = {
        status_code: data.status,
        message: ''
    }   
    
    if (result.status_code == 'FETCH_ERROR') { 
        result.message = 'Network Error'
        result.status_code = 500
        return result  
    }

    if (data.page == 'login' && data.status == 200) {
        if (data.data.non_field_errors) {
            result.message = data.data.non_field_errors[0]
         }
    }

    return result
}

