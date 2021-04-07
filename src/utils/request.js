import axios from 'axios'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error);
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 20000) {
            let errorText = res.message
            alert(errorText)

            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                alert("You have been logged out, you can cancel to stay on this page, or log in again")
            }
            return Promise.reject(new Error(res.message || 'Error'))
        }
        else {
            return res
        }
    },
    error => {
        console.log('err' + error)
        let errorText = error.message
        alert(errorText)

        return Promise.reject(error)
    }
)

export default service