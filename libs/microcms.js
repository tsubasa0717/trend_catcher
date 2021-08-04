import axios from 'axios'
import { createClient } from 'microcms-js-sdk'

export const MicrocmsClient = class {
  constructor(endpoint) {
    this.endpoint = endpoint
    this.uri = `https://${process.env.NEXT_PUBLIC_MICROCMS_DOMAIN}.microcms.io/api/v1/${endpoint}`
    this.headers = {
      headers: {
        'Content-Type': 'application/json',
        'X-WRITE-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_WRITE_KEY,
      },
    }
    this.microcms = createClient({
      serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_DOMAIN,
      apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
      apiWriteKey: process.env.NEXT_PUBLIC_MICROCMS_API_WRITE_KEY,
    })
  }
  // リスト取得
  async getList() {
    return (await this.microcms.get({ endpoint: this.endpoint }))?.contents
  }
  // 単一取得
  async get(id) {
    // 現状不要
  }
  // キーワードから取得
  async getFromKeyword(keyword) {
    const record = await this.microcms.get({
      endpoint: this.endpoint,
      queries: { filters: `keyword[equals]${keyword}` },
    })
    return record?.contents
  }
  async create(data) {
    axios
      .post(this.uri, data, this.headers)
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    // return 要検討
  }
  // 更新
  async update(id, data) {
    const uri = this.uri + `/${id}`
    axios
      .patch(uri, data, this.headers)
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    // return 要検討
  }
  async delete() {
    // 現状不要
  }
}
