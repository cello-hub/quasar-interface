import { ReactNode } from 'react'

type UniExpandRowProps = { children: ReactNode }

export default function UniExpandRow(props: UniExpandRowProps) {
  return (
    <div
      style={{
        marginLeft: '34px'
      }}
    >
      {props.children}
    </div>
  )
}
