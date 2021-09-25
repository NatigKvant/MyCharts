import React, { useState, useEffect } from 'react'
import './DrowDown.css'

const Checkbox = ({ row, updateVisible, index }) => {

    const [visible, setVisible] = useState(row.visible)

    useEffect(() => {
        updateVisible(visible, index)
    }, [visible])

    return (
        <input
            type='checkbox'
            checked={visible}
            onChange={(e) => setVisible(e.target.checked)}
        />
    )
}


export default Checkbox
