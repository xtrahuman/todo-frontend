import React from 'react';
/* eslint-disable */
const Header = ({categoryName}) => {
    // console.log(categoryName,'check name')
    const headerStyle = {
      padding: "20px 0",
      lineHeight: "1.5em",
    }
    return (
      <header const={headerStyle}>
        <h1 style={{
        fontSize: "2rem",
        fontWeight: "600",
        marginBottom: "2rem",
        lineHeight: "1em",
        color: "#ececec",
        textTransform: "lowercase",
        textAlign: "center",
        marginTop: "0px"
      }}>Todo list - {categoryName}</h1>
      </header>
    );

}

export default Header;
/* eslint-disable */