import { create } from 'zustand'
interface IThemeState {
  colorPrimary: string // 主题色
  updateColorPrimary: (color: string) => void
}

const useThemeStore = create<IThemeState>()((set) => ({
  colorPrimary: localStorage.getItem('colorPrimary') || '#00B96B',
  updateColorPrimary: (color: string) => {
    localStorage.setItem('colorPrimary', color)
    set({ colorPrimary: color })
  }
}))

export default useThemeStore
