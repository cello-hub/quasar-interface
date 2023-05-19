import { ColorPicker } from 'antd'
import styles from './index.module.css'
import useThemeStore from '../../../../store/useThemeStore'

export default function Navigator() {
  const updateColorPrimary = useThemeStore((state) => state.updateColorPrimary)
  return (
    <div className={styles.navigator}>
      <div className=''>标题</div>

      <div>
        <ColorPicker
          onChange={(_, hex) => updateColorPrimary(hex)}
          presets={[
            {
              label: 'Recommended',
              colors: [
                '#000000',
                '#00B96B',
                '#FA8C16',
                '#FADB14',
                '#8BBB11',
                '#52C41A',
                '#13A8A8',
                '#1677FF',
                '#2F54EB',
                '#722ED1',
                '#EB2F96',
                '#F5222D4D',
                '#FA8C164D',
                '#FADB144D',
                '#8BBB114D',
                '#52C41A4D',
                '#13A8A84D',
                '#1677FF4D',
                '#2F54EB4D'
              ]
            }
          ]}
        />
      </div>
    </div>
  )
}
