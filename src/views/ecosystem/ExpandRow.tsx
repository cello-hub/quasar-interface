import React from 'react'
import { IEcosystem } from '../../types/entities/ecosystem'

export default function ExpandRow(props: IEcosystem) {
  return (
    <div>
      {props.desc && <div>描述: {props.desc}</div>}
      {props.remark && (
        <div
          style={{
            marginTop: '10px'
          }}
        >
          备注: {props.remark}
        </div>
      )}
    </div>
  )
}
