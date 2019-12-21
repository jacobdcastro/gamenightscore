import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const PageViewTabs = ({ pageView, setPageView }) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setPageView(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={pageView}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab label='Standings' />
        <Tab label='Rounds' />
        <Tab label='Chart' />
      </Tabs>
    </Paper>
  );
};

PageViewTabs.propTypes = {
  pageView: PropTypes.number.isRequired,
  setPageView: PropTypes.func.isRequired,
};

export default PageViewTabs;
