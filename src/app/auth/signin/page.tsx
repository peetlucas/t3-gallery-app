import { getProviders } from "next-auth/react";
import SignInButton from "./SignInButton";

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <div>
      <h1>Sign In</h1>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <SignInButton
              providerId={provider.id}
              providerName={provider.name}
            />
          </div>
        ))}
    </div>
  );
}
