import axios from 'axios'

axios.upload = async (url, filename, file, config = {}) => {
  const formData = new FormData() // 创建一个对象实例
  formData.append(filename || 'file', file);

  if (config.data && !(config.data instanceof FormData)) {
    Object.entries(config.data).forEach(([key, value]) => {
      value !== undefined && value !== null && formData.append(key, String(value))
    })
  }

  return axios.request({
    ...config,
    url: url,
    method: 'post',
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    },
  })
}
