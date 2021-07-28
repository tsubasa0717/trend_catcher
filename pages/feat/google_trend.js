// //google-trends-api利用
// import { GoogleTrendClient } from '../../libs/google_trend'

// // export default function testPost({ data }) {
// //   return <div>{data}</div>
// // }

// // データをテンプレートに受け渡す部分の処理を記述します
// export default getStaticProps = async () => {
//   const googleTrendClient = new GoogleTrendClient()
//   const data = await googleTrendClient.getInterestOverTime({
//     keyword: 'node',
//     geo: 'JP',
//     hl: 'ja',
//     startTime: '2020-01-01',
//     endTime: '2020-07-01',
//   })
//   // const data = await googleTrendClient.getRelatedQueries({
//   //   keyword: 'node',
//   //   geo: 'JP',
//   //   hl: 'ja',
//   //   startTime: '2020-01-01',
//   //   endTime: '2020-07-01',
//   // })

//   return {
//     props: {
//       data: JSON.stringify(data),
//     },
//   }
// }
