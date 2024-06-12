"use client";

import ReactHookForm from "@/providers/ReactHookForm";
import { createVaultsSchema } from "@/react-hook-form/validations/CreateVaults";
import FormWrapper from "./FormWrapper";
import { WalletKitProvider } from "@mysten/wallet-kit";

type Props = {};

const PoolPageCreate = (props: Props) => {
  return (
    <WalletKitProvider>
      <ReactHookForm
        validateSchema={createVaultsSchema}
        defaultValues={{
          tokens: [
            {
              percent: 100,
            },
          ],
        }}
      >
        <FormWrapper />
      </ReactHookForm>
    </WalletKitProvider>
  );
};

export default PoolPageCreate;
