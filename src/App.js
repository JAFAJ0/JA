import "./styles.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./searchBar";
import StudentList from "./studentList";
function MyC() {
  const [input, setInput] = useState("");
  const [taginput, settagInput] = useState("");
  const [error, setError] = useState(null);
  const [items, setItems] = useState();
  const [fitems, setfItems] = useState();
  const [tags, setTags] = React.useState(new Array(25).fill("")); //This one is used to record tag text
  const [tagsA, setTagsA] = React.useState([...Array(25)].map((x) => [])); //This one is to record tags
  function handleChange(value, id) {
    const newtags = tags.map((tag, tagid) => {
      if (tagid === parseInt(id, 10) - 1) {
        tag = value;
      }
      return tag;
    });
    setTags(newtags);
  }
  function handleEnter(value, id) {
    //if enter is pressed, clear input and creat new tags
    if (value === "Enter" && tags[parseInt(id, 10) - 1] !== "") {
      const newtagsA = tagsA.map((tag, tagid) => {
        if (tagid === parseInt(id, 10) - 1) {
          tagsA[tagid].push(tags[tagid]);
        }
        return tag;
      });
      const newtags = tags.map((tag1, tagid) => {
        if (tagid === parseInt(id, 10) - 1) {
          tag1 = "";
        }
        return tag1;
      });
      setTagsA(newtagsA);
      setTags(newtags);
    }
  }
  const updateNInput = async (input) => {
    const Nitems = items.map((item) => {
      //Attach tags to items
      item.tag = tagsA[item.id - 1];
      return item;
    });
    const Nfiltered = Nitems.filter((list) => {
      //Then instead of filtering items, filt Nitems
      return (
        list.firstName.toLowerCase().includes(input.toLowerCase()) ||
        list.lastName.toLowerCase().includes(input.toLowerCase())
      );
    });
    if (taginput !== "") {
      const Tfiltered = Nfiltered.filter((list) => {
        return list.tag === undefined
          ? false
          : list.tag.join("").toLowerCase().includes(taginput.toLowerCase());
      });
      setfItems(Tfiltered);
    } else {
      setfItems(Nfiltered);
    }
    setInput(input);
  };
  const updateTInput = async (taginput) => {
    const Nitems = items.map((item) => {
      //Attach tags to items
      item.tag = tagsA[item.id - 1];
      return item;
    });
    const Nfiltered = Nitems.filter((list) => {
      return (
        list.firstName.toLowerCase().includes(input.toLowerCase()) ||
        list.lastName.toLowerCase().includes(input.toLowerCase())
      );
    });
    if (taginput !== "") {
      const Tfiltered = Nfiltered.filter((list) => {
        return list.tag === undefined
          ? false
          : list.tag.join("").toLowerCase().includes(taginput.toLowerCase());
      });
      setfItems(Tfiltered);
    } else {
      setfItems(Nfiltered);
    }

    settagInput(taginput);
  };
  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result.students);
          setfItems(result.students);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <SearchBar
          keyword={input}
          setKeyword={updateNInput}
          placeholder={"Search by name"}
        />
        <SearchBar
          keyword={taginput}
          setKeyword={updateTInput}
          placeholder={"Search by tag"}
        />
        <StudentList
          items={fitems}
          tags={tags}
          setTag={handleChange}
          handleEnter={handleEnter}
          tagArray={tagsA}
        />
      </>
    );
  }
}
export default function App() {
  return MyC();
}
