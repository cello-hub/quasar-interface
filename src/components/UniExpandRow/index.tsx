import { ReactNode } from 'react'

type UniExpandRowProps = { children: ReactNode }

export default function UniExpandRow(props: UniExpandRowProps) {
  return (
    <div
      style={{
        margin: '20px 60px'
      }}
    >
      {props.children}
    </div>
  )
}
