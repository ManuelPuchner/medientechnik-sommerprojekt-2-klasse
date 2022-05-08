import styled from "styled-components";
import React from "react";
import { useState, useEffect, useRef } from "react";

const DropdownWrapper = styled.div`
  position: relative;
  z-index: 1000;
`;

const DropdownHeader = styled.div`
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  padding: 0.5em 0.6em;
  border-radius: 0.2em;
  margin: 0;
  user-select: none;
  border: none;
  display: block;
  font-size: 1em;

  &:hover {
    cursor: pointer;
  }
`;

const Items = styled.div`
  position: absolute;
`;
const ItemWrapper = styled.div`
  display: block;
  background: #fff;
  border: none;
  padding: 0.5em 0.6em;
  margin-top: 0.2em;
  border-radius: 0.2em;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  z-index: 1000;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  }
`;

function Item({ children, ...props }) {
  return <ItemWrapper {...props}>{children}</ItemWrapper>;
}

function Dropdown({ children, headerConfig, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const handleClick = (e) => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener("click", handlePageClick);
    () => document.removeEventListener("click", handlePageClick);
  }, []);

  const handlePageClick = (e) => {
    const isOutsideClick = !ref.current.contains(e.target);
    if (isOutsideClick) {
      setIsOpen(false);
    }
  };
  return (
    <DropdownWrapper>
      <DropdownHeader onClick={handleClick} ref={ref} backgroundColor={headerConfig.backgroundColor}>
        {headerConfig.content}
      </DropdownHeader>
      <Items>{isOpen && children}</Items>
    </DropdownWrapper>
  );
}

Dropdown.Item = Item;

export default Dropdown;
