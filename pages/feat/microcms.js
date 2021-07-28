// pages/index.js
import Link from 'next/link'
import { microcmsClient } from '../../libs/microcms'

export default function Microcms({ users }) {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/blog/${user.id}`}>
              <a>{user.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const db_users = new microcmsClient('user')

  return {
    props: {
      users: await db_users.getList(),
    },
  }
}
