import styled from "styled-components";
import { FaCcApplePay } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { useState, useContext } from "react";
import { CartContext } from "stores/Cart";
import Dropdown from "components/dropdown";
import CheckoutButton from "components/cart_additions/CheckoutButton";

const CheckoutWrapper = styled.div`
  display: flex;

  & > * {
    flex: 1;
  }
`;

const DataInputWrapper = styled.div``;

const ExpressCheckoutWrapper = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  position: relative;
  padding: 1rem;
`;
const ExpressCheckoutButton = styled.button`
  background: white;
  border: none;
  border-radius: 0.4rem;
  padding: 0.5rem;
  outline: none;

  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 0.15rem 0.3rem rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  & > svg {
    height: 2rem;
    width: 2rem;
  }
`;
const ExpressCheckoutHeader = styled.div`
  background: white;
  width: fit-content;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  & > * {
    margin: 0;
    padding: 2px;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const OrDevider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;

  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 0.3rem;
  }
`;

const NormalCheckoutWrapper = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  padding: 1rem;
`;

const ContactInformationWrapper = styled.div``;
const ContactInformationHeader = styled.h3``;
const ContactInformationContent = styled.div`
  position: relative;
  & > div {
    font-weight: 300;
    position: absolute;
    right: 0;
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  margin: 0.3rem 0.15rem;

  &:focus {
    outline: none;
    box-shadow: 0 0.15rem 0.3rem rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }
`;
const CheckboxInput = styled.input``;

const DropdownHeader = styled.div`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  margin: 0.3rem 0.15rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
    box-shadow: 0 0.15rem 0.3rem rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }
`;

const ShippingAddressWrapper = styled.div``;
const ShippingAddressHeader = styled.h3``;
const ShippingAddressContent = styled.div``;

const SplitWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {
    flex: 1;
  }
`;

const CartInformationWrapper = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Price = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
`;
const ConfirmOrderButton = styled(CheckoutButton)`
  position: static;
`;

export default function Checkout() {
  const [countries, setCountries] = useState([]);
  const { cartItems, setCartItems, removeCartItem } = useContext(CartContext);
  const expressCheckoutProviders = [
    {
      name: "PayPal",
      logo: <FaCcPaypal />,
    },
    {
      name: "Google Pay",
      logo: <FaGooglePay />,
    },
    {
      name: "Apple Pay",
      logo: <FaCcApplePay />,
    },
  ];

  const getCountries = async () => {
    const response = await fetch(
      "https://restcountries.com/v2/all?fields=name"
    );
    const data = await response.json();
    setCountries(data);
    return data;
  };

  getCountries();

  return (
    <>
      <CheckoutWrapper>
        <DataInputWrapper>
          <ExpressCheckoutWrapper>
            <ExpressCheckoutHeader>
              <span>Express Checkout</span>
            </ExpressCheckoutHeader>
            <expressCheckoutProviders>
              <SplitWrapper>
                {expressCheckoutProviders.map((provider) => (
                  <ExpressCheckoutButton key={provider.name}>
                    {provider.logo}
                  </ExpressCheckoutButton>
                ))}
              </SplitWrapper>
            </expressCheckoutProviders>
          </ExpressCheckoutWrapper>

          <OrDevider>
            <span>OR</span>
          </OrDevider>

          <NormalCheckoutWrapper>
            <ContactInformationWrapper>
              <ContactInformationHeader>
                Contact Information
              </ContactInformationHeader>
              <ContactInformationContent>
                <TextInput placeholder="Email" type="email" />
                <div>
                  <span>Email me with news and offers</span>{" "}
                  <CheckboxInput type="checkbox" />
                </div>
              </ContactInformationContent>

              <ShippingAddressWrapper>
                <ShippingAddressHeader>Shipping Address</ShippingAddressHeader>
                <SplitWrapper>
                  <TextInput placeholder="First Name" type="text" />
                  <TextInput placeholder="Last Name" type="text" />
                </SplitWrapper>
                <SplitWrapper>
                  <TextInput placeholder="Company (optional)" type="text" />
                  <TextInput placeholder="Address" type="text" />
                  <TextInput placeholder="Suburb" type="text" />
                </SplitWrapper>
                <SplitWrapper>
                  <Dropdown
                    headerConfig={{
                      content: <DropdownHeader>Country/region</DropdownHeader>,
                      hasPadding: false,
                    }}
                  >
                    {countries.map((country) => (
                      <Dropdown.Item key={country.name}>
                        {country.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                  <Dropdown
                    headerConfig={{
                      content: <DropdownHeader>State/terretory</DropdownHeader>,
                      hasPadding: false,
                    }}
                  >
                    {countries.map((country) => (
                      <Dropdown.Item key={country.name}>
                        {country.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                  <TextInput type="text" placeholder="Postcode" />
                </SplitWrapper>
                <TextInput placeholder="Phone" type="tel" />
              </ShippingAddressWrapper>
            </ContactInformationWrapper>
          </NormalCheckoutWrapper>
        </DataInputWrapper>

        <CartInformationWrapper>
          <SplitWrapper>
            <Price>Price: {123}€</Price>
            <ConfirmOrderButton>Confirm Order</ConfirmOrderButton>
          </SplitWrapper>
        </CartInformationWrapper>
      </CheckoutWrapper>
    </>
  );
}
