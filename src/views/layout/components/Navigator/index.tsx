import { ColorPicker } from 'antd'
import styles from './index.module.css'
import useThemeStore from '../../../../store/useThemeStore'
import { throttle } from 'lodash-es'

export default function Navigator(props: { title?: string }) {
  const updateColorPrimary = useThemeStore((state) => state.updateColorPrimary)

  const onUpdateColor = throttle((hex: string) => updateColorPrimary(hex), 300)
  return (
    <div className={styles.navigator}>
      <div className={styles.nav_title}>{props.title}</div>

      <div>
        <ColorPicker
          onChange={(_, hex) => onUpdateColor(hex)}
          presets={[
            {
              label: 'Recommended',
              colors: [
                '#000000',
                '#FFFFFF',
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
