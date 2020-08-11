import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ThemeProvider } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {
                padding: '2px, 2px, 2px, 2px',
            },
            body: {
                height: '30px !important',
            },
            head: {
                height: '30px !important',
            },
        }
    }
});

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
    row: {
        height: '12px',
    },
});

export default function Deposits() {
    const classes = useStyles();
    const coinDetail = useSelector(state => state.coinsReducer.coinDetails);
    const [coinCardDetails, setCoinCardDetails] = useState(null);
    const customPadding = { padding: '5px 5px 5px 5px' };

    useEffect(() => {
        if (coinDetail !== undefined) {
            setCoinCardDetails(coinDetail[0]);
            console.log(coinDetail);
            console.log(coinCardDetails);
        }
    }, [coinDetail, setCoinCardDetails, coinCardDetails]);

    return (
        <div>
            { coinCardDetails !== null && coinCardDetails !== undefined ? (
                <div>
                    {Object.keys(coinCardDetails).map(key => {
                        return <div key={key}>
                            <TableContainer component={Paper}>
                                <ThemeProvider theme={theme}>
                                    <Table size="small" aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={customPadding}>{key}</TableCell>
                                                <TableCell style={customPadding}>Value</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow className={classes.row}>
                                                <TableCell style={customPadding}>Last</TableCell>
                                                <TableCell style={customPadding}>{coinCardDetails[key].last}</TableCell>
                                            </TableRow>
                                            <TableRow className={classes.row}>
                                                <TableCell style={customPadding}>Lowest Ask</TableCell>
                                                <TableCell style={customPadding}>{coinCardDetails[key].lowestAsk}</TableCell>
                                            </TableRow>
                                            <TableRow className={classes.row}>
                                                <TableCell style={customPadding}>Highest Bid</TableCell>
                                                <TableCell style={customPadding}>{coinCardDetails[key].highestBid}</TableCell>
                                            </TableRow>
                                            <TableRow className={classes.row}>
                                                <TableCell style={customPadding}>High 24 Hr</TableCell>
                                                <TableCell style={customPadding}>{coinCardDetails[key].high24hr}</TableCell>
                                            </TableRow>
                                            <TableRow className={classes.row}>
                                                <TableCell style={customPadding}>Low 24 Hr</TableCell>
                                                <TableCell style={customPadding}>{coinCardDetails[key].low24hr}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </ThemeProvider>
                            </TableContainer>
                        </div>
                    })}
                </div>
            ) : (
                <Typography variant="h6">
                    Clique sobre uma moeda nas linhas do gráfico para exibir seus dados.
                </Typography>
            )}

            {/* <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on 15 March, 2019
            </Typography> */}
        </div>
    );
}