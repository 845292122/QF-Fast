import { Typography } from 'antd'
import { createStyles } from 'antd-style'
import React from 'react'
import { useRouteMeta } from '~/hooks/useRouteMeta'

type Props = {
  children: React.ReactNode
  actionBar?: React.ReactNode
}

const useStyles = createStyles(() => {
  return {
    headerContainer: {
      height: '56px',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '20px'
    },
    content: {
      padding: '10px 30px',
      height: '100%'
    },
    container: {
      overflow: 'auto'
    },
    actionWrapper: {
      paddingRight: 20
    }
  }
})

export default function PageContainer({ children, actionBar }: Props) {
  const { styles } = useStyles()
  const routeMeta = useRouteMeta()

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <div
            style={{
              borderRadius: '0.5rem',
              height: '25px',
              width: '6px',
              marginRight: '10px',
              marginLeft: '5px',
              backgroundColor: '#1d1db7'
            }}
          />
          <Typography.Text strong style={{ fontSize: 16 }}>
            {routeMeta.title}
          </Typography.Text>
        </div>
        <div className={styles.actionWrapper}>{actionBar}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
