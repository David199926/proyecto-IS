import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {  createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './Progress.css'

const theme = createMuiTheme({
    palette:{
        primary:{
        main:'#ffd413'
      }
  }});
  

export default function Progress({ progress, setProgress }) {
    return (
        <div>
            <span>Progreso</span>
            <div className="progress-indicators">
                <ThemeProvider theme={theme}>
                <Slider value={progress} color='primary' onChange={(event, value) => { setProgress(value); }} />
                </ThemeProvider>
                <TextField
                    type="number"
                    value={progress}
                    max={100}
                    min={0}
                    onChange={(e) => { setProgress(parseInt(e.target.value)); }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        inputProps: { min: 0, max: 100 }
                    }}
                />
            </div>
        </div>
    )
}