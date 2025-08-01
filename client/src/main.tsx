import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import Router from './router'
import AuthRouter from './router/helper/authRouter'
import { ConfigProvider, ThemeConfig } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './main.css'
import '@icon-park/react/styles/index.css'
import { App } from 'antd'
import { ThemeProvider } from 'antd-style'

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0E42D2',
    colorInfo: '#3f51b5',
    colorSuccess: '#4caf50',
    colorWarning: '#ffc107',
    colorError: '#f44336',
    borderRadius: 2
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthRouter>
            <App>
              <Router />
            </App>
          </AuthRouter>
        </BrowserRouter>
      </ThemeProvider>
    </ConfigProvider>
  </StrictMode>
)
