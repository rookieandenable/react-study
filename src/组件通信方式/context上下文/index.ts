import { createContext, useContext } from "react"

type ThemeProps = {
  son: string
  father: string
}

export const ThemeContext = createContext<ThemeProps>({
  son: 'dart_1',
  father: 'light_1'
})

export const useThemeContext = () => {
  const theme = useContext(ThemeContext)
  if(!theme) return
  return theme
}