import React, { useState } from 'react'
import './DrowDown.css'
import SettingsIcon from '@material-ui/icons/Settings'
import Checkbox from './Checkbox'

const DropDown = ({ rows, updateVisible }) => {
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)

    return (
        <div className='settings'>
            <SettingsIcon className='button' onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}/>
            <div className={`settings__menu ${settingsMenuOpen ? 'active' : ''}`}
                 onClick={() => setSettingsMenuOpen(false)}>

                <div onClick={e => e.stopPropagation()}>

                    <ul>
                        {rows.map((row, index) =>
                            <li key={index}>
                                <label>
                                    <Checkbox row={row} key={index} index={index} updateVisible={updateVisible} /> {row.name}
                                </label>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DropDown
