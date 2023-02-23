import { BigNumber, constants, utils } from 'ethers';
import { Formik, FormikErrors, Form, Field, ErrorMessage } from 'formik';
import { Dispatch, SetStateAction, useState } from 'react';
import { useContractWrite } from 'wagmi';
import useContractRead from '../../lib/hooks/useContractRead';
import { gmooContract, gmooABI } from '../../lib/util/addresses';
import { toastSuccess, toastError } from '../../lib/util/toast';
import { LoadingIcon } from '../Icons';

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type FormValues = {
  unlockPassword: string;
};

const UnlockAdvanced = ({ id, open, setOpen }: Props) => {
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const { write: unlock } = useContractWrite({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'unlockMoo',
    onSuccess: () => {
      setLoading(false);
      setOpen(false);
      toastSuccess('Unlocked Moo!');
    },
    onError: (error) => {
      setLoading(false);
      setOpen(false);
      error && toastError(error);
    },
  });

  const { data } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'getMoo',
    args: id,
    enabled: open,
  });

  const unlockPriceWei: BigNumber = data?.unlockPrice;
  const unlockPrice = utils.formatEther(unlockPriceWei);

  return (
    <Formik
      initialValues={{
        tokenId: id,
        unlockPassword: '',
        payBounty: false,
      }}
      onSubmit={({ tokenId, unlockPassword }) => {
        setLoading(true);
        unlock({
          args: [tokenId, unlockPassword, constants.AddressZero],
          overrides: {
            value: unlockPassword ? undefined : unlockPriceWei,
          },
        });
      }}
      onReset={(values, actions) => {
        actions.setValues({
          tokenId: id,
          unlockPassword: '',
          payBounty: false,
        });
        setOpen(false);
      }}
      validate={({ unlockPassword, payBounty }) => {
        let errors: FormikErrors<FormValues> = {};

        if (!payBounty && unlockPassword === '') {
          errors.unlockPassword = 'Password cannot be empty.';
        }
        return errors;
      }}
    >
      <Form className="my-4 flex flex-col gap-4">
        <div className="flex flex-1 flex-col">
          <label className="px-2 font-gmcafe text-lg text-purple" htmlFor="tokenId">
            ID
          </label>
          <Field
            className="cursor-not-allowed rounded border-2 border-purple bg-gray-100 py-1 px-2 text-purple"
            type="number"
            id="tokenId"
            name="tokenId"
            disabled
            required
          />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <label className="font-gmcafe text-lg text-purple" htmlFor="unlockPassword">
              Password
            </label>
            <button
              type="button"
              className="ml-auto w-max text-xs text-purple"
              onClick={() => setForgotPassword(true)}
            >
              Forgot password?
            </button>
          </div>
          <Field
            className="rounded border-2 border-purple bg-white py-1 px-2 text-purple"
            type="password"
            id="unlockPassword"
            name="unlockPassword"
          />
          <ErrorMessage
            component="span"
            className="text-right text-xs text-pink"
            name="unlockPassword"
          />
        </div>
        {forgotPassword && (
          <div className="flex flex-col">
            <label className="flex gap-2 font-gmcafe text-purple">
              <Field type="checkbox" name="payBounty" />
              Skip password and pay bounty
            </label>
            <p className="text-sm text-purple">
              You previously set a lock price of {unlockPrice} Ξ. By selecting the checkbox you
              agree to pay the lock price instead of unlocking your moo with a password.
            </p>
          </div>
        )}
        <div className="mt-2 flex justify-end gap-4">
          <Field
            className="cursor-pointer rounded-lg border-2 border-purple px-4 py-1 font-gmcafe text-xl text-purple"
            type="reset"
            value="Cancel"
          />
          {!loading && (
            <Field
              className="cursor-pointer rounded-lg bg-purple px-4 py-1 font-gmcafe text-xl text-white"
              type="submit"
              value="Unlock"
            />
          )}
          {loading && (
            <div className="flex items-center rounded-lg bg-purple py-2 px-6">
              <LoadingIcon className="static" />
            </div>
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default UnlockAdvanced;
