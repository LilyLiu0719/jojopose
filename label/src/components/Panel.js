import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

const Panel = (handleClear) => {
  return (
    <>
      <Button type="primary" danger onClick={null}>
        Upload
        </Button>
      <Button type="primary" onClick={null}>
        Download
        </Button>
      <Button type="primary" onClick={handleClear}>
        Clear
        </Button>
    </>
  )
}




export default Panel