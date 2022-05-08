import { useSession } from "next-auth/react";


export default function Account() {
  const { data, status } = useSession();
  return <>
    <h2>Account</h2>
    <div>
      <h3>Your Configurations: </h3>

    </div>





    <pre>{JSON.stringify(data, null, 2)}</pre>
  </>;
}
