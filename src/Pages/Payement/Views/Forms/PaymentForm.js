import React //, {useState }
    from 'react';
import {
    TextField,
    Grid,
    Typography
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    CardCvcElement,
    CardNumberElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import { useStateValue } from "../../StateContext";
import StripeInput from '../../components/StripeInput'

const PaymentForm = () => {

    const [{ formValues }, dispatch] = useStateValue();

    const cardsLogo = [
        "amex",
        "cirrus",
        "diners",
        "dankort",
        "discover",
        "jcb",
        "maestro",
        "mastercard",
        "visa",
        "visaelectron",
    ];

    return <>
        <Grid container item xs={12}>
            <Grid item xs={12} sm={3}>
                <Typography variant="h6">Payment Data</Typography>
            </Grid>
            <Grid container item xs={12} sm={9} justify="space-between">
                {cardsLogo.map(e => <img key={e} src={`./cards/${e}.png`} alt={e} width="50px" align="bottom" style={{ padding: "0 5px" }} />)}
            </Grid>
        </Grid>
        <Grid item xs={6} sm={3}>
            <Autocomplete
                options={currencies}
                getOptionLabel={option => option.code}
                renderOption={option => <>{option.name} ({option.code})</>}
                renderInput={params =>
                    <TextField
                        label="Currency"
                        name="currency"
                        variant="outlined"
                        fullWidth
                        {...params}
                    />
                }
                value={formValues.currency}
                onChange={(event, value) => {
                    dispatch({
                        type: "editFormValue",
                        key: "currency",
                        value: value
                    })
                }}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField
                label="Amount"
                name="amount"
                variant="outlined"
                required
                fullWidth
                value={formValues.amount}
                onChange={e =>
                    dispatch({
                        type: "editFormValue",
                        key: "amount",
                        value: e.target.value.replace(/[^0-9,.]/g, '')
                    })
                }
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label="Credit Card Number"
                name="ccnumber"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardNumberElement
                    },
                }}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
                label="Expiration Date"
                name="ccexp"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputProps: {
                        component: CardExpiryElement
                    },
                    inputComponent: StripeInput
                }}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
                label="CVC"
                name="cvc"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputProps: {
                        component: CardCvcElement
                    },
                    inputComponent: StripeInput
                }}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
    </>
}

export default PaymentForm;

const currencies = [  
    {
        "symbol": "DT",
        "name": "Tunisian Dinar",
        "symbol_native": "د.ت.‏",
        "decimal_digits": 3,
        "rounding": 0,
        "code": "TND",
        "name_plural": "Tunisian dinars"
    },
]