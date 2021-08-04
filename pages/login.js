import { Button } from '@material-ui/core'
import { signIn, signOut, useSession } from 'next-auth/client'
import React from 'react'
import GenericTemplate from '../components/GenericTemplate'

export default function Page() {
  const [session, loading] = useSession()

  return (
    <>
      <GenericTemplate title="ログイン / ログアウト">
        {!session && (
          <>
            <Button variant="contained" color="primary" style={{ marginBottom: 40 }} onClick={signIn}>
              Sign in
            </Button>
          </>
        )}
        {session && (
          <>
            <Button variant="contained" color="primary" style={{ marginBottom: 40 }} onClick={signOut}>
              Sign out
            </Button>
          </>
        )}
      </GenericTemplate>
    </>
  )
}
