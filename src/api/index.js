import axios from 'axios';
// axios.defaults.baseURL = 'http://api.cat-shop.penkuoer.com';

let base=process.env.API_ROOT;
//拦截器

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token')){
		console.log('请求了token')
    		config.headers.common['authorization'] = "Bearer "+localStorage.getItem('token');
    }
    return config;
  }, function (error) {
	// 对请求错误做些什么
	console.log('请求错误')
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log('获取到数据了')
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });




export const POST=(url,params)=>{
	return axios.post(`${base}${url}`,params).then(res=>res)
}

export const GET=(url,params)=>{
	return axios.get(`${base}${url}`,{params:params}).then(res=>res)
}
