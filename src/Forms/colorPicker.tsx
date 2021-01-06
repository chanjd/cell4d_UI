import React, { useState } from 'react'
import reactCSS from 'reactcss'
import { CompactPicker } from 'react-color'

export default function ColorPicker(props: { red: number, green: number, blue: number, onChange: any }) {
  const [displayPicker, setDisplayPicker] = useState(false)
  const handleClick = () => {
    setDisplayPicker(!displayPicker)
  };

  const handleClose = () => {
    setDisplayPicker(false)
  };


  const styles = reactCSS({
    'default': {
      color: {
        width: '60px',
        height: '21px',
        borderRadius: '2px',
        background: `rgba(${props.red}, ${props.green}, ${props.blue}, 1)`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: 2,
      } as React.CSSProperties,
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      } as React.CSSProperties,
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      { displayPicker ? <div style={styles.popover}>
        <div style={styles.cover} onClick={handleClose} />
        <CompactPicker color={{r: props.red, g: props.green, b: props.blue}} onChange={props.onChange} />
      </div> : null}

    </div>
  )
}
