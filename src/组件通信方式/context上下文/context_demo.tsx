import { useThemeContext } from "."

function Son() {
  const theme = useThemeContext()

  return (
    <>
      <div>theme context 的 son 值：{theme?.son}</div>
    </>
  )
}

export function Father() {
  const theme = useThemeContext()

  return (
    <>
      <Son />
      <div>theme context 的 father 值：{theme?.father}</div>
    </>
  )
}