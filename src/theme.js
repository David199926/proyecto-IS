import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F2C94C",
            light: "#f4d36f",
            dark: "#a98c35",
        }
    }, overrides: {
        MuiIconButton: {
            colorPrimary: {
                color: "#fff"
            }
        },
        MuiTypography: {
            h4: {
                marginTop: "1.5rem",
                marginBottom: "1rem"
            }
        },
        MuiChip: {
            root: {
                marginRight: "1.5rem",
            }
        },
        MuiButton: {
            outlinedPrimary: {
                color: "#000000DE"
            }
        }
    }
});