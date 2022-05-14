import { getSession, useSession } from "next-auth/react";
import { StatusCodes } from "http-status-codes";
import { connectToDatabase } from "lib/mongodb";
import { ObjectId } from "mongodb";
import styled from "styled-components";
import Link from "next/link";
import base64 from "base-64";
import ConfigBox from "components/account_additions/ConfigBox";
import { AiOutlineEdit } from "react-icons/ai";
import { BsCartPlus, BsCartCheck } from "react-icons/bs";
import { useState, useContext } from "react";
import { CartContext } from "stores/Cart";
import ConfigLink from "components/account_additions/ConfigLink";

const ConfigList = styled.ul`
  width: clamp(30rem, 70%, 45rem);
`;

const ConfigListItem = styled.li`
  display: flex;
  padding: 0.2rem;
  margin-top: 1rem;
`;

const ConfigurationsWrapper = styled.div`
  width: 66.66666667%;
`;

const AccountPageWrapper = styled.div`
  display: flex;
`;

const AccountInfo = styled.div`
  width: 33.33333333%;
`;

const AccountNameWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AccountName = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 1rem;
  text-align: center;
`;

const EditAccountName = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }

  & > svg {
    font-size: 1.5rem;
  }
`;

const AccountImage = styled.img`
  width: clamp(10rem, 50%, 50rem);
  margin: 0 auto;
  border-radius: 50%;
  display: block;
`;



const AddToCartButton = styled(ConfigLink)`
  & > * {
    pointer-events: none;
  }
`;
function Account({ status, data }) {
  const {cartItems, setCartItems, removeCartItem, addCartItem} = useContext(CartContext);
  const [inCartIds, setInCartIds] = useState(
    new Set(
      data.configs
        .map((config) => config.isInCart && config._id)
        .filter(Boolean)
    )
  );

  const addToCart = async (e, config) => {
    const id = config._id;
    e.preventDefault();
    if (!inCartIds.has(id)) {
      // let result = await fetch("/api/cart", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id,
      //   }),
      // });

      // let json = await result.json();
      // if (result.status === StatusCodes.OK) {
      //   addToInCartIds(id);
      //   setCartItems([...cartItems, config]);
      // } else {
      //   console.log("Error", json);
      // }
      //
      let result = await addCartItem({config});
      if (result.status === StatusCodes.OK) {
        addToInCartIds(id);
      } else {
        console.log("Error", result);
      }
    } else {
      let result = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      let json = await result.json();
      if (result.status === StatusCodes.OK) {
        removeFromInCartIds(id);
        setCartItems(cartItems.filter((config) => config._id !== id));
      } else {
        console.log("error", json);
      }
    }
  };

  const addToInCartIds = (id) => {
    let newSet = new Set([...inCartIds, id]);
    setInCartIds(newSet);
  };

  const removeFromInCartIds = (id) => {
    let newSet = new Set([...inCartIds].filter((_id) => _id !== id));
    setInCartIds(newSet);
  };

  return (
    <>
      <AccountPageWrapper>
        <AccountInfo>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <AccountImage src={data.user.image} alt="prifile picture" />
          <AccountNameWrapper>
            <AccountName>{data.user.name}</AccountName>
            <EditAccountName title="Edit your Account name (not implemented yet)">
              <AiOutlineEdit />
            </EditAccountName>
          </AccountNameWrapper>
          <Link passHref href="/cart">
            <ConfigLink>View Your Cart</ConfigLink>
          </Link>
        </AccountInfo>
        <ConfigurationsWrapper>
          <h3>Your Configurations: </h3>
          {data.configs.length > 0 ? (
            <ConfigList>
              {data.configs.map((config) => {
                let encodedConfig = base64.encode(JSON.stringify(config));
                return (
                  <ConfigListItem key={config._id}>
                    <ConfigBox config={config} />
                    <Link
                      passHref
                      href={`/configurator?config=${encodedConfig}`}
                    >
                      <ConfigLink title="Edit / View your configuration">
                        <AiOutlineEdit />
                      </ConfigLink>
                    </Link>
                    <AddToCartButton
                      title="Add to your cart"
                      onClick={(e) => addToCart(e, config)}
                    >
                      {inCartIds.has(config._id) ? (
                        <BsCartCheck />
                      ) : (
                        <BsCartPlus />
                      )}
                    </AddToCartButton>
                  </ConfigListItem>
                );
              })}
            </ConfigList>
          ) : (
            <p>You have no configurations yet.</p>
          )}
        </ConfigurationsWrapper>
      </AccountPageWrapper>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      props: {
        status: StatusCodes.UNAUTHORIZED,
        data: { error: "Unauthorized" },
      },
    };
  }

  let { db } = await connectToDatabase();

  let user = await db.collection("users").findOne(session.user);
  if (!user) {
    return {
      props: {
        status: StatusCodes.NOT_FOUND,
        data: { error: "User not found" },
      },
    };
  }

  let userConfigs = await db
    .collection("configurations")
    .find({ userId: ObjectId(user._id) })
    .sort({ updatedAt: -1 })
    .toArray();

  if (user?.cart?.items?.length > 0) {
    userConfigs = userConfigs.map((config) => {
      config.isInCart = !!user.cart.items.find((configId) =>
        configId.equals(config._id)
      );
      return config;
    });
  }
  userConfigs = JSON.parse(JSON.stringify(userConfigs));
  user = JSON.parse(JSON.stringify(user));

  return {
    props: {
      status: StatusCodes.OK,
      data: {
        user,
        configs: userConfigs,
      },
    },
  };
};

export default Account;
