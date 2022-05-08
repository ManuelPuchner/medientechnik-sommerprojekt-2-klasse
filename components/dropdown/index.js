import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { BsFillArrowUpLeftSquareFill } from "react-icons/bs";

const DropdownWrapper = styled.div`
  background-color: #fff;
  position: relative;
  border-radius: 0.2em;
`;

const DropdownHeader = styled.button`
  width: 100%;
  padding: 0.5em 0.6em;
  user-select: none;
  background: transparent;
  border: none;

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

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  }
`;

function Item({ children, ...props }) {
  return <ItemWrapper {...props}>{children}</ItemWrapper>;
}

function Dropdown({ children, label, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleClick = (e) => {
    if (!isOpen) {
      console.log("clicked 1 ");
      document.addEventListener("click", handlePageClick);
    } else {
      console.log("clicked 2");
      document.removeEventListener("click", handlePageClick);
    }
    setIsOpen(!isOpen);
  };

  const handlePageClick = (e) => {
    if (e.target !== ref.current) {
      setIsOpen(false);
    }
  }

  return (
    <DropdownWrapper>
      <DropdownHeader ref={ref} onClick={handleClick}>
        {label}
      </DropdownHeader>
      <Items>{isOpen && children}</Items>
    </DropdownWrapper>
  );
}

Dropdown.Item = Item;

export default Dropdown;
