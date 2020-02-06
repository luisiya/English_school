import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tasks from './UnitsList';

const useStyles = makeStyles(theme => ({
  startBtn: {
    background: 'linear-gradient(45deg, #fe6c6c 30%, #ebff79 90%)',
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    fontSize: 'larger',
    fontWeight: '900',
  },
  footer: {
    position: 'relative',
    bottom: '-90%',
    fontFamily: 'monospace',
    color: '#bbb3b3',
  },
}));

export const UnitsWrapper = () => {
  const classes = useStyles();
  const [isShow, setShow] = useState(false);
  const show = () => {
    setShow(true);
    document.body.classList.add('update_bg');
  };
  return (
    <Fragment>
      {!isShow
        ? (
          <>
            <Button className={classes.startBtn} variant="contained" onClick={show}>СТАРТ</Button>
            <footer className={classes.footer}>© 2019-2020 Developed by Luisi Kravchenko</footer>
          </>
        )
        : ''}
      {isShow ? <Tasks /> : ''}

    </Fragment>
  );
};


export default UnitsWrapper;
