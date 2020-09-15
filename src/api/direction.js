import axios from 'axios'

export async function getItems(type, forceValueNumber = false) {
  if (!type) throw new Error('type 参数不能为空')
  const {data} = await axios.get(`/dictionary/items/${type}`)
  if (data && Array.isArray(data)) {
    return data.map(({k, v}) => ({label: k, value: forceValueNumber ? Number(v) : v}))
  }
  return []
}
