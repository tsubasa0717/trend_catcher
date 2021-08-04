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
import { getSession } from 'next-auth/client'
import { default as React, useState } from 'react'
import Chart from '../components/Chart'
import GenericTemplate from '../components/GenericTemplate'
import { GoogleTrendsClient } from '../libs/google_trends'
import { MicrocmsClient } from '../libs/microcms'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const Home = ({ initData, historiesData, user }) => {
  const classes = useStyles()
  const [graphData, setGraphData] = useState(initData)
  const [histories, setHistories] = useState(historiesData)
  const [keyword, setKeyword] = useState('Next.js')

  const startSearch = async (keyword) => {
    // microCMS連携
    const db_words = new MicrocmsClient('t_words')
    const record = await db_words.getFromKeyword(keyword)
    if (record.length) {
      await db_words.update(record[0].id, {
        keyword: record[0].keyword,
        last_searcher: user.name,
        count: String(Number(record[0].count) + 1),
      })
    } else {
      await db_words.create({
        keyword,
        last_searcher: user.name,
        count: String(1),
      })
    }

    // 履歴更新 (遅延処理)
    setTimeout(async () => {
      const history_data = await db_words.getList()
      setHistories(history_data)
    }, 5000)

    // GoogleTrends連携
    const trends_data = await GoogleTrendsClient.getInterestOverTime(keyword)
    setGraphData(trends_data)
  }

  const handleKeywordFormChange = (e) => {
    setKeyword(e.target.value)
  }

  const handleKeywordFormSubmit = async () => {
    if (keyword != '') {
      await startSearch(keyword)
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
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              e.preventDefault()
              handleKeywordFormChange(e)
              handleKeywordFormSubmit()
            }
          }}
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
                <TableCell align="right">検索回数</TableCell>
                <TableCell align="right">最終検索ユーザー</TableCell>
                <TableCell align="right">最終検索時刻</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histories.map((history) => (
                <TableRow key={history.updatedAt}>
                  <TableCell component="th" scope="row">
                    {history.keyword}
                  </TableCell>
                  <TableCell align="right">{history.count}</TableCell>
                  <TableCell align="right">{history.last_searcher}</TableCell>
                  <TableCell align="right">{history.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </GenericTemplate>
    </>
  )
}

// TODO: getServerSideProps vs getStaticProps
export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
  }

  const user = session.user
  const db_words = new MicrocmsClient('t_words')
  const history_data = await db_words.getList()
  const trends_data = await GoogleTrendsClient.getInterestOverTime('Next.js')

  return {
    props: { initData: trends_data, historiesData: history_data, user },
  }
}

export default Home
