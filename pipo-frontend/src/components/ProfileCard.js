import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListSubheader from "@material-ui/core/ListSubheader";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    marginTop: 12,
  },
  row: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  root: {
    flexGrow: 1,
  },
});

function SimpleCard(props) {
  const {classes} = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <ListSubheader
          align="left"
          style={{fontWeight: "bold"}} >{props.user ? props.user.name : "User"}
        </ListSubheader>
        <Divider style={{marginBottom: 20}} />
        <Typography
          variant="h5"
          component="h2">
          <div className={classes.row}>
            <Avatar
              alt="Elizabeth Rose"
              src="/static/images/cards/man.png"
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
          </div>
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
        >
          Progress to your personal IPO
        </Typography>
        <div className={classes.root}>
          <LinearProgress
            variant="determinate"
            value={props.user && props.user.issuer ? "100" : "20"} />
        </div>
        <Typography
          className={classes.pos}
          style={{color: props.user && props.user.issuer ? "green" : "grey"}}>
          ✔️ Add more details <br/>
          ✔️ Know your value <br/>
          ✔️ Make your dreams true!
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          styles={{align:"center"}}
          onClick={() => props.changePage(props.user && props.user.issuer ? "/issuer_profile" : "/issuer_signup")}>
          {props.user && props.user.issuer ? "Check IPO Status" : "IPO NOW"}
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  changePage: (path) => push(path),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SimpleCard));
