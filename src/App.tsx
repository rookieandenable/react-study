import './App.css'
import { ThemeContext } from './组件通信方式/context上下文'
import { Index as Father }  from '../demo_1/demo_1'

function App() {
  const theme = {
    son: 'dart',
    father: 'light'
  }

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Father />
      </ThemeContext.Provider>
    </>
  )
}

export default App
