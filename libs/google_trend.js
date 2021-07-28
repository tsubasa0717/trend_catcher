export const GoogleTrendClient = class {
  constructor() {
    this.endpoint = `http://localhost:3000/api/google_trend`
  }
  // トレンド検索
  async getInterestOverTime(params) {
    const query_params = new URLSearchParams(params)
    const res = await fetch(this.endpoint + '?target_api=interestOverTime&' + query_params)
    return (await res.json())?.default?.timelineData
  }

  // 関連ワード検索
  async getRelatedQueries(params) {
    const query_params = new URLSearchParams(params)
    const res = await fetch(this.endpoint + '?target_api=relatedQueries&' + query_params)
    return (await res.json())?.default?.rankedList
  }
}
