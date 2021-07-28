import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import { useRouter } from 'next/router'
import { default as React, useState } from 'react'
import Chart from '../components/Chart'
import GenericTemplate from '../components/GenericTemplate'
import { GoogleTrendClient } from '../libs/google_trend'

const createData = (name, category, weight, price) => {
  return { name, category, weight, price }
}

const rows = [
  createData('チョコレート', 'お菓子', 100, 120),
  createData('ケーキ', 'お菓子', 400, 480),
  createData('りんご', 'フルーツ', 500, 360),
  createData('バナナ', 'フルーツ', 200, 300),
  createData('みかん', 'フルーツ', 250, 180),
]

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const Home = ({ initData }) => {
  const classes = useStyles()
  const [graphData, setGraphData] = useState(initData)
  const [keyword, setKeyword] = useState('Next.js')
  const router = useRouter()

  React.useEffect(() => {
    // Remove the server-side injeacted CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const getTrendValues = async (keyword) => {
    const googleTrendClient = new GoogleTrendClient()
    const data = await googleTrendClient.getInterestOverTime({
      keyword,
      geo: 'JP',
      hl: 'ja',
      startTime: '2010-01-01',
      endTime: '2021-07-01',
    })
    setGraphData(data)
  }

  const handleKeywordFormChange = (e) => {
    setKeyword(e.target.value)
  }

  const handleKeywordFormSubmit = async () => {
    if (keyword != '') {
      await getTrendValues(keyword)
    }
  }

  return (
    <>
      <GenericTemplate title="検索">
        <TextField
          label="Search word."
          style={{ marginBottom: 20 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          value={keyword}
          onChange={handleKeywordFormChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginBottom: 40 }}
          onClick={handleKeywordFormSubmit}
        >
          GET TREND
        </Button>
        <Chart data={graphData} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>検索ワード</TableCell>
                <TableCell align="right">カテゴリー</TableCell>
                <TableCell align="right">重量(g)</TableCell>
                <TableCell align="right">価格(円)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </GenericTemplate>
    </>
  )
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const googleTrendClient = new GoogleTrendClient()

  const data = await googleTrendClient.getInterestOverTime({
    keyword: 'Next.js',
    geo: 'JP',
    hl: 'ja',
    startTime: '2010-01-01',
    endTime: '2020-07-01',
  })
  return {
    props: { initData: data },
  }
}

export default Home
