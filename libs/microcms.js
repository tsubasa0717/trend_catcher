import { createClient } from 'microcms-js-sdk'

export const microcmsClient = class {
  constructor(endpoint) {
    this.endpoint = endpoint
    this.microcms = createClient({
      serviceDomain: process.env.MICROCMS_DOMAIN,
      apiKey: process.env.MICROCMS_API_KEY,
    })
  }
  // リスト取得
  async getList() {
    return (await this.microcms.get({ endpoint: this.endpoint }))?.contents
  }
  // TODO: 単一取得
  async get(id) {
    return {
      id: 1,
      name: 'dummy',
    }
  }
  // TODO: 保存
  async create() {
    return {
      id: 1001,
      name: 'dummy',
    }
  }
  // 更新
  async update() {
    // 現状不要
  }
  async delete() {
    // 現状不要
  }
}
