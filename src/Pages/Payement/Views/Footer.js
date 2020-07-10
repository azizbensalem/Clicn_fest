import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Link
} from "@material-ui/core";
import {
    Security,
    Info
} from "@material-ui/icons";
import NoticeDialog from "./LegalNoticePopups/NoticeDialog";

const Footer = () => {

    return <>
        <Grid container justify="center" style={{minHeight: "212px"}}>
            <Grid container item sm={6} xs={11} justify="space-between">
            </Grid>
        </Grid>
        <AppBar position="static" elevation={0} component="footer" color="default">
            <Toolbar style={{ justifyContent: "center" }}>
                <Typography variant="caption">©2020</Typography> <NoticeDialog  separator="&nbsp;᛫" />
            </Toolbar>
        </AppBar>
    </>
}

export default Footer;