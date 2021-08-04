/*
 * client sideで実行できない
 * https://github.com/pat310/google-trends-api/issues/131
 *
 * 外部APIを使う案件はclientで実行できるか確認しないと事故る
 */

export const GoogleTrendsClient = class {
  // トレンド検索
  static async getInterestOverTime(keyword) {
    const endpoint = `${process.env.NEXT_PUBLIC_SYSTEM_DOMAIN}/api/google_trends`
    const res = await fetch(endpoint + '?target_api=interestOverTime&keyword=' + keyword)
    return (await res.json())?.default?.timelineData
  }

  // 関連ワード検索
  static async getRelatedQueries(keyword) {
    const endpoint = `${process.env.NEXT_PUBLIC_SYSTEM_DOMAIN}/api/google_trends`
    const res = await fetch(endpoint + '?target_api=relatedQueries&keyword=' + keyword)
    return (await res.json())?.default?.rankedList
  }
}
