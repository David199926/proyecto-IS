import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import './Progress.css'

export default function Progress({ progress, setProgress }) {
    return (
        <div>
            <span>Progreso</span>
            <div className="progress-indicators">
                <Slider value={progress} onChange={(event, value) => { setProgress(value); }} />
                <TextField
                    type="number"
                    value={progress}
                    max={100}
                    min={0}
                    onChange={(e) => { setProgress(parseInt(e.target.value)); }}
                    id="progress-input"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        inputProps: { min: 0, max: 100 },
                        name: "progress-textfield"
                    }}
                />
            </div>
        </div>
    )
}