import React, { useEffect, useRef, useState } from "react";

export default function Search({query,setQuery}) {

  const inputElem = useRef(null)

  useEffect(function(){
    
    function callback(e){
      if (document.activeElement === inputElem.current)
      return;

      if (e.code === "Enter"){
        inputElem.current.focus()
        setQuery("")
      }

    }

    document.addEventListener("keydown",callback)
    return ()=>document.addEventListener("keydown",callback)

  },[setQuery])

  // useEffect(function(){
  //   const el = document.querySelector(".search")
  //   el.focus()
  // },[query])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElem}
    />
  );
}
