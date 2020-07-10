import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from './LinearProgress';
import clicnfest from '../Images/clicnfestblack.png';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        background: 'white',
    },
    img: {
        width: '31vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        paddingTop: '32vh'
    }
}));

export default function LinearDeterminate() {
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);

    React.useEffect(() => {
        function progress() {
            setCompleted(oldCompleted => {
                if (oldCompleted === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            });
        }

        const timer = setInterval(progress, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <LinearProgress variant="determinate" value={completed} />
            <img src={clicnfest} className={classes.img} />
        </div>
    );
}
