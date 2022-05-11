import { getSession, useSession } from "next-auth/react";
import { StatusCodes } from "http-status-codes";
import { connectToDatabase } from "lib/mongodb";
import { ObjectId } from "mongodb";
import styled from "styled-components";
import Link from "next/link";
import base64 from "base-64";
import ConfigBox from "components/account_additions/ConfigBox";
import { AiOutlineEdit } from "react-icons/ai";

const ConfigList = styled.ul`
  width: clamp(30rem, 65%, 50rem);
`;

const ConfigListItem = styled.li`
  display: flex;
  padding: 1rem;
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

const ConfigLink = styled.a`
  box-shadow: 0px 0.4rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(0.5rem);
  border-radius: 0.3rem;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 0.3rem;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-1px);
    box-shadow: 0px 0.4rem 0.6rem rgba(0, 0, 0, 0.2);
  }

  width: 5.5rem;

  & > svg {
    display: block;
    font-size: 1.5rem;
    width: 2rem;
    height: 2rem;
  }
`;

function Account({ status, data }) {
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
        </AccountInfo>
        <ConfigurationsWrapper>
          <h3>Your Configurations: </h3>
          {data.configs.length > 0 ? (
            <ConfigList>
              {data.configs.map((config, index) => {
                let encodedConfig = base64.encode(JSON.stringify(config));
                return (
                  <ConfigListItem key={index}>
                    <ConfigBox config={config} />
                    <Link
                      passHref
                      href={`/configurator?config=${encodedConfig}`}
                    >
                      <ConfigLink title="Edit / View your configuration">
                        <AiOutlineEdit />
                      </ConfigLink>
                    </Link>
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
    .sort({ createdAt: -1 })
    .toArray();

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
