import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask } from "./actions/index";

class Card extends Component {
  state = { collapsed: true };

  handleDelete = () => {
    const { deleteTask, task } = this.props;
    if (window.confirm("Are you sure to delete this item?")) {
      deleteTask(task);
    }
  };

  render() {
    const { onDragEnd, task } = this.props;

    return (
      <div
        style={style()}
        draggable={true}
        onDragEnd={e => {
          onDragEnd(e, task);
        }}
      >
        <div style={{ textAlign: "right" }}>
          <span onClick={() => {}} className="edit">
            <i className="fa fa-pencil" />
          </span>
          <span>&nbsp;</span>
          <span onClick={this.handleDelete} className="delete">
            <i className="fa fa-trash" />
          </span>
          <span>&nbsp;</span>
        </div>
        <div style={{ padding: "5px" }} id={'task-' + task.id}>
          <strong>{task.name}</strong>
        </div>
      </div>
    );
  }
}

const style = () => ({
  backgroundColor: "#f9f7f7",
  paddingLeft: "0px",
  paddingTop: "5px",
  paddingBottom: "5px",
  marginLeft: "0px",
  marginRight: "5px",
  marginBottom: "5px"
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteTask: task => dispatch(deleteTask(task))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
