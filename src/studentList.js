import React, { useState } from "react";
//import { WithContext as ReactTags } from "react-tag-input";

const StudentList = ({
  items = [],
  tagArray,
  setTag,
  tags = [],
  handleEnter
}) => {
  const [list, setList] = React.useState(new Array(25).fill(true));
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
          //items.tag = tagArray[item.id - 1];
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
                <div className="tag">
                  {tagArray[item.id - 1].map((grade, i) => {
                    return (
                      <button className="button1" type="button" key={item.id}>
                        {grade}
                      </button>
                    );
                  })}
                </div>
                <div className="input">
                  <input
                    value={tags[item.id - 1]}
                    placeholder={"Add a tag"}
                    onChange={(e) => setTag(e.target.value, item.id)}
                    onKeyPress={(e) => handleEnter(e.key, item.id)}
                    type="text"
                  />
                </div>
              </div>
              <button
                className="button"
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
