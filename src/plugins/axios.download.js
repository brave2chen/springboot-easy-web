import axios from 'axios'

axios.download = async (url, filename, params, config = {}) => {
  const response = await axios.request({
    ...config,
    url: url,
    method: config.method || 'get',
    responseType: 'blob',
    params,
  })
  return new Promise(((resolve) => {
    // 有可能下载失败，返回{code: 500},但responseType: 'blob'会把data强制转为blob，导致下载undefined.excel
    // 解决：将已转为blob类型的data转回json格式，判断是否下载成功
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      // 如果JSON.parse(event.target.result)不报错，event.target.result是json字符串，是下载报错情况的返回值，弹框提示
      // 如果JSON.parse(event.target.result)报错，说明下载成功，进入catch
      try {
        // event.target.result为FileReader获取blob数据转换为json后的数据，即后台返回的原始数据
        let jsonData = JSON.parse(String(event.target.result))
        if (jsonData) {
          throw new Error("文件下载链接，后端却返回了json格式数据:" + jsonData)
        }
      } catch (e) {
        let fileName = filename
        // 获取文件名
        if (!fileName) {
          fileName = response.headers['content-disposition']
          if (fileName && fileName.length >= 2) {
            fileName = fileName.split('=')[1]
          }
          fileName = decodeURIComponent(fileName)
        }
        const blobObject = new Blob([response.data])
        // 兼容ie11
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blobObject, fileName)
        } else {
          let url = window.URL.createObjectURL(blobObject)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()

          link.remove();
        }
        resolve();
      }
    }
    // FileReader的API
    fileReader.readAsText(response.data)
  }))
}
