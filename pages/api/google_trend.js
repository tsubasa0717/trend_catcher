import gta from 'google-trends-api'

export default function handler(req, res) {
  const params = req.query

  // TODO: 日付処理 : いい方法検討
  // 日付型
  params.startTime = new Date(params.startTime)
  params.endTime = new Date(params.endTime)

  // main api
  gta[params.target_api](params)
    .then((results) => {
      const json = JSON.parse(results)
      res.status(200).json(JSON.parse(results))
    })
    .catch((err) => {
      console.error(err)
    })
}
