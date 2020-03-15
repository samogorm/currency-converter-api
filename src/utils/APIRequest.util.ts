import axios from 'axios';

class APIRequestUtil {
  get = (url: string, params: object) => {
    return axios.get(url, { params: params })
    .then(response => {
        if(response.status !== 200) return Promise.reject(response.data);
        Promise.resolve(response.data);

        return response.data;
    })
    .catch(error => {
        console.log(error);
    });
  }
}

export default APIRequestUtil;
