
export const extractErrorMessages = (error)=> {
     if(!error) return null;

     if(error.response?.data) {
        const data = error.response.data;

        if(data.errors && Array.isArray(data.errors)) {
            return data.errors.map(err => err.message).join(',');
        }

        if(data.message) {
            return data.message;
        }

        if(data.error) {
            return data.error
        }
     }

   
    if(error.request && !error.response) {
        return 'Network Error, Please Check Your Connection' 
    }

    if(error.message) {
        return error.message
    }

    return 'Something went wrong, please try again'
}