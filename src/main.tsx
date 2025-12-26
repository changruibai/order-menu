import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 隐藏首屏 Loading
const hideLoading = () => {
  if (typeof window !== 'undefined' && (window as any).hideLoading) {
    // 稍微延迟以确保 React 渲染完成
    requestAnimationFrame(() => {
      (window as any).hideLoading();
    });
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App onReady={hideLoading} />
  </React.StrictMode>,
)


