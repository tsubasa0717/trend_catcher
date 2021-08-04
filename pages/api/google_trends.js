import gta from 'google-trends-api'

export default async function handler(req, res) {
  const keyword = req.query.keyword
  const method = req.query.target_api

  gta[method]({
    keyword,
    geo: 'JP',
    hl: 'ja',
    startTime: new Date('2010-01-01'),
    endTime: new Date('2021-07-01'),
  })
    .then((results) => {
      res.status(200).json(JSON.parse(results))
    })
    .catch((err) => {
      console.error(err)
    })
}
