import { getSession, useSession } from "next-auth/react";
import { StatusCodes } from "http-status-codes";
import { connectToDatabase } from "lib/mongodb";
import { ObjectId } from "mongodb";
import styled from "styled-components";
import { HEXtoHSV } from "utils/colorConversions";
import Link from "next/link";

const ConfigList = styled.ul`
  width: clamp(25rem, 50%, 50rem);
`;

const ConfigListItem = styled.li`
  display: flex;
  padding: 1rem;
  margin-top: 1rem;
  background: red;
`;

const ColorBoxesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const ColorBox = styled.div`
  background-color: ${(props) => props.color};
  color: ${(props) => props.fontColor};
  width: calc(25% - 0.2rem);
  text-align: center;
  padding: 0.2rem;
  box-sizing: border-box;
  margin: 0.1rem;
`;

function ConfigBox({ config }) {
  const getLuminance = (hexColor) => {
    const hsv = HEXtoHSV(hexColor);
    return hsv.v;
  };
  return (
    <>
      <ColorBoxesWrapper>
        {Object.keys(config.colors).map((key, index) => {
          let fontColor =
            getLuminance(config.colors[key]) > 55 ? "black" : "white";
          return (
            <ColorBox
              key={index}
              color={config.colors[key]}
              fontColor={fontColor}
            >
              {key}
            </ColorBox>
          );
        })}
      </ColorBoxesWrapper>
    </>
  );
}

function Account({ status, data }) {
  const { sessionData, sessionStatus } = useSession();
  return (
    <>
      <h2>Account</h2>
      <div>
        <h3>Your Configurations: </h3>
        <ConfigList>
          {data.configs.map((config, index) => {
            let encodedConfig = encodeURIComponent(JSON.stringify(config));
            return (
              <ConfigListItem key={index}>
                <ConfigBox config={config} />
                <Link href={`/configurator?config=${encodedConfig}`}>
                  <a>Edit/View Config</a>
                </Link>
              </ConfigListItem>
            );
          })}
        </ConfigList>
      </div>

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
    .toArray();

  userConfigs = JSON.parse(JSON.stringify(userConfigs));
  delete user._id;
  return {
    props: {
      status: StatusCodes.OK,
      data: {
        user: user,
        configs: userConfigs,
      },
    },
  };
};

export default Account;
