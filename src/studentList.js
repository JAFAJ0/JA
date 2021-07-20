import React, { useState } from "react";
//import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: [10, 13]
};
const delimiters = [...KeyCodes.enter, KeyCodes.comma];
const StudentList = ({ items = [] }) => {
  const [list, setList] = React.useState(new Array(25).fill(true));
  const [tagArray, setTagArray] = React.useState(new Array(25).fill([]));
  const [tags, setTags] = useState(new Array(25).fill(""));
  function toggleList(id) {
    const newList = list.map((item, itemid) => {
      if (itemid === parseInt(id, 10) - 1) {
        item = !item;
      }
      return item;
    });
    setList(newList);
  }

  return (
    <div className="item">
      {items &&
        items.map((item) => {
          const aGrade =
            item.grades.reduce(
              (prevValue, currentValue) =>
                prevValue + parseInt(currentValue, 10),
              0
            ) / item.grades.length;
          const name =
            item.firstName.toUpperCase() + " " + item.lastName.toUpperCase();
          items.tag = tagArray[item.id - 1];
          return (
            <div className="total" key={item.id}>
              <img
                style={{
                  marginTop: "1.5%",
                  marginRight: "5%",
                  marginLeft: "5%",
                  border: "1px solid grey",
                  borderRadius: "150%",
                  width: 100,
                  height: 100
                }}
                src={item.pic}
                alt="new"
              />
              <div className="details">
                <div className="name">
                  <p>{name}</p>
                </div>
                <div className="detail">
                  <p>Email: {item.email}</p>
                  <p>️Company: {item.company}</p>
                  <p>Skill: {item.skill}</p>
                  <p>Average:{aGrade}%</p>
                  {list[item.id - 1]
                    ? null
                    : item.grades.map((grade, i) => {
                        return (
                          <p>
                            Test{i + 1}: {grade}%
                          </p>
                        );
                      })}
                </div>
                <div className="input">
                  <input
                    value={tags[item.id - 1]}
                    placeholder={"Add a tag"}
                    //onChange={}
                    //onKeyDown={(e) => handlekey(e, item.id - 1)}
                    type="text"
                  />
                </div>
              </div>
              <button
                class="button"
                style={{
                  marginTop: "0.5%",
                  marginRight: "5%",
                  marginLeft: "15%",
                  border: "none",
                  width: 30,
                  height: 40,
                  color: "grey"
                }}
                type="button"
                key={item.id}
                onClick={() => toggleList(item.id)}
              >
                {list[item.id - 1]
                  ? String.fromCodePoint(parseInt("002B", 16))
                  : String.fromCodePoint(parseInt("02D7", 16))}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default StudentList;
