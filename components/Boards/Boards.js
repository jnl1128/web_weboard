import React, { Component } from "react";
import "./Boards.css";
import { getList, addToList, deleteItem, updateItem } from "./ListFunctions";


class Board extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      term: "",
      editDisabled: false,
      items: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  onChange = event => {
    this.setState({ term: event.target.value, editDisabled: "disabled" });
    console.log(this.state.editDisabled);
  };

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          term: "",
          items: [...data]
        },
        () => {
          console.log(this.state.items);
        }
      );
    });
  };

  onSubmit = e => {
    e.preventDefault();
    addToList(this.state.term).then(() => {
      this.getAll();
    });
  };

  onUpdate = e => {
    e.preventDefault();
    updateItem(this.state.term, this.state.id).then(() => {
      this.getAll();
    });
  };

  onEdit = (item, itemid, e) => {
    e.preventDefault();
    this.setState({
      id: itemid,
      term: item
    });
  };

  onDelete = (val, e) => {
    e.preventDefault();
    deleteItem(val);

    var data = [...this.state.items];
    data.filter(function(item, index) {
      if (item[1] === val) {
        data.splice(index, 1);
      }
	  return true;
    });
    this.setState({ items: [...data] });
  };

  render() {
    return (
     <div>
     <div className = 'notice'>우리반 공지사항 
     <i class="fas fa-check"></i></div>
        <table className="table">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="number">{index+1}. </td>
                <td className="text-left">{item[0]}</td>
                <td className="text-right">

                <style>{`
                 p2{
                   float: right;
                 }`
                  }
                </style>

                  <div align="right">
                    <p2>
                    <button
                      href=""
                      className="btn-danger"
                      onClick={this.onDelete.bind(this, item[1])}>삭제</button>
                    </p2>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        <div className = "form-group">
        <form onSubmit={this.onSubmit}>
                <input
                  size = "25"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={this.state.term || ""}
                  onChange={this.onChange.bind(this)}/>

                  <button
                  align="right"
                  type="submit"
                  onClick={this.onSubmit.bind(this)}
                  className="btn btn-success btn-block"
                  >작성</button>
        </form>
      </div>
      </div>

    );
  }
}

export default Board;
