import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./Card";
import AddTask from "./AddTask";
import { updateColumnCap } from "./actions/index";

class Column extends Component {
  state = {
    mouseIsHovering: false,
    addTaskIsVisible: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ mouseIsHovering: false });
  }

  generateCards() {
    const { tasks, onDragEnd } = this.props;
    return tasks.map(task => (
      <Card task={task} key={task.id || Math.random()} onDragEnd={onDragEnd} />
    ));
  }

  addTaskVisibleToggle = () => {
    const { addTaskIsVisible } = this.state;
    this.setState({ addTaskIsVisible: !addTaskIsVisible });
  };

  columnConfig = () => {
    const { updateColumnCap, stage } = this.props;
    let cap = window.prompt("Enter max capacity -1 to unset");
    cap = Number.parseInt(cap, 10);
    if (Number.isNaN(cap)) {
      return alert("This is not a number!");
    }
    updateColumnCap(stage, cap);
  };

  render() {
    const { stage, name, tasks, onDragEnter, cap } = this.props;
    const { mouseIsHovering, addTaskIsVisible } = this.state;

    return (
      <div
        style={style(mouseIsHovering)}
        onDragEnter={e => {
          this.setState({ mouseIsHovering: true });
          onDragEnter(e, stage);
        }}
        onDragExit={e => {
          this.setState({ mouseIsHovering: false });
        }}
      >
        <div style={{ textAlign: "right" }}>
          {cap === -1 ? (
            <span style={{ marginRight: "2px" }}>
              <i className="fa fa-unlock" />
            </span>
          ) : (
            <span
              style={{ marginRight: "5px", fontSize: "0.8em", color: "red" }}
            >
              <strong>{cap}</strong>
            </span>
          )}
          <span onClick={this.columnConfig} className="edit">
            <i className="fa fa-cog" />
          </span>
          <span>&nbsp;</span>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>
            {name} ({tasks.length})
          </strong>
        </div>
        {this.generateCards()}
        {!addTaskIsVisible ? (
          <div style={{ marginBottom: "5px" }}>
            <span onClick={this.addTaskVisibleToggle} className="add">
              <i className="fa fa-plus" />
            </span>
          </div>
        ) : (
          <AddTask
            stage={stage}
            cap={cap}
            addTaskVisibleToggle={this.addTaskVisibleToggle}
          />
        )}
      </div>
    );
  }
}

const style = mouseIsHovering => ({
  display: "inline-block",
  verticalAlign: "top",
  marginRight: "5px",
  marginBottom: "5px",
  paddingLeft: "5px",
  paddingTop: "0px",
  width: "230px",
  textAlign: "center",
  backgroundColor: mouseIsHovering ? "#d3d3d3" : "#f0eeee"
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateColumnCap: (stage, cap) => dispatch(updateColumnCap(stage, cap))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Column);
