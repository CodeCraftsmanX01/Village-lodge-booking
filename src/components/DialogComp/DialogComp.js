import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
})

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h4">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    )
})

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
    },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(1),
    },
}))(MuiDialogActions)

const DialogComp = ({
    isOpen,
    handleClose,
    heading,
    buttonName,
    body
}) => {
    return (
        <div className="dialog">
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <p className='tertiaryHeading'>{heading}</p>
                </DialogTitle>
                <DialogContent dividers>
                    {body}
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-brown btn-long' onClick={handleClose} color="primary">
                        {buttonName}
                    </button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default DialogComp
