import FirstPageIcon from "@material-ui/icons/FirstPage";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {withStyles} from "@material-ui/core/styles";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const {classes, count, page, rowsPerPage, theme} = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
  TablePaginationActions,
);

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class CustomizedTable extends React.Component {
  state = {
    page: 0,
  }

  handleClick = (event, id) => {
    console.log(id);
    this.props.changePage(id);
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  render() {
    const {classes, rows} = this.props;
    const {page} = this.state;
    console.log(rows);
    return (

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Person Name</CustomTableCell>
              <CustomTableCell>Symbol</CustomTableCell>
              <CustomTableCell numeric>Share Price</CustomTableCell>
              <CustomTableCell numeric>Shares</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow
                  onClick={event => this.handleClick(event,row.issuer_id)}
                  className={classes.row}
                  key={index}>
                  <CustomTableCell
                    component="th"
                    scope="row">
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell>{row.symbol}</CustomTableCell>
                  <CustomTableCell numeric>{row.reference_price}</CustomTableCell>
                  <CustomTableCell numeric>{row.total_shares}</CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={rows.length}
                rowsPerPage={6}
                page={page}
                onChangePage={this.handleChangePage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = null;

const mapDispatchToProps = {
  changePage: (id) => push(`/issuer_details/${id}`),
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomizedTable));
