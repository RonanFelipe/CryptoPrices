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
                padding: '0px, 0px, 0px, 0px',
            },
            body: {
                height: '30px !important',
            },
            head: {
                height: '30px !important',
            },
            paddingNone: {
                paddingNone: 'true',
            }
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
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow className={classes.row}>
                                                <TableCell padding="none">{key}</TableCell>
                                                <TableCell padding="none">Value</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow className={classes.row}>
                                                <TableCell padding="none">Last</TableCell>
                                                <TableCell padding="none">{coinCardDetails[key].last}</TableCell>
                                            </TableRow>
                                            <TableRow className={classes.row}>
                                                <TableCell padding="none">Lowest Ask</TableCell>
                                                <TableCell padding="none">{coinCardDetails[key].lowestAsk}</TableCell>
                                            </TableRow>
                                            <TableRow className={classes.row}>
                                                <TableCell padding="none">Highest Bid</TableCell>
                                                <TableCell padding="none">{coinCardDetails[key].highestBid}</TableCell>
                                            </TableRow>
                                            <TableRow className={classes.row}>
                                                <TableCell padding="none">High 24 Hr</TableCell>
                                                <TableCell padding="none">{coinCardDetails[key].high24hr}</TableCell>
                                            </TableRow>
                                            <TableRow className={classes.row}>
                                                <TableCell padding="none">Low 24 Hr</TableCell>
                                                <TableCell padding="none">{coinCardDetails[key].low24hr}</TableCell>
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