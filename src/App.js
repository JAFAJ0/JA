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
  const updateNInput = async (input) => {
    const Nfiltered = items.filter((list) => {
      return (
        list.firstName.toLowerCase().includes(input.toLowerCase()) ||
        list.lastName.toLowerCase().includes(input.toLowerCase())
      );
    });
    if (taginput !== "") {
      const Tfiltered = Nfiltered.filter((list) => {
        return list.tag === undefined
          ? false
          : list.tag.toLowerCase().includes(taginput.toLowerCase());
      });
      setfItems(Tfiltered);
    } else {
      setfItems(Nfiltered);
    }
    setInput(input);
  };
  const updateTInput = async (taginput) => {
    const Nfiltered = items.filter((list) => {
      return (
        list.firstName.toLowerCase().includes(input.toLowerCase()) ||
        list.lastName.toLowerCase().includes(input.toLowerCase())
      );
    });
    if (taginput !== "") {
      const Tfiltered = Nfiltered.filter((list) => {
        return list.tag === undefined
          ? false
          : list.tag.toLowerCase().includes(taginput.toLowerCase());
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
        <StudentList items={fitems} />
      </>
    );
  }
}
export default function App() {
  return MyC();
}
