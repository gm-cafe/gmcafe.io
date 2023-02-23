import { utils } from 'ethers';
import { Formik, FormikErrors, Form, Field, ErrorMessage } from 'formik';
import { Dispatch, SetStateAction, useState } from 'react';
import { useContractWrite } from 'wagmi';
import { gmooContract, gmooABI } from '../../lib/util/addresses';
import { toastError, toastSuccess } from '../../lib/util/toast';
import { LoadingIcon } from '../Icons';

type FormValues = {
  tokenId: string;
  lockPrice: number;
  lockPassword: string;
};

type Props = {
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LockAdvanced = ({ id, setOpen }: Props) => {
  const [loading, setLoading] = useState(false);

  const { write: lock } = useContractWrite({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'lockMoo',
    onSuccess: () => {
      setLoading(false);
      setOpen(false);
      toastSuccess('Locked Moo!');
    },
    onError: (error) => {
      setLoading(false);
      setOpen(false);
      error && toastError(error);
    },
  });

  return (
    <Formik
      initialValues={{
        tokenId: id,
        lockPrice: 0,
        lockPassword: '',
      }}
      onSubmit={({ tokenId, lockPrice, lockPassword }) => {
        setLoading(true);
        const priceInGwei = utils.parseEther(lockPrice.toString());
        const hashedPassword = utils.solidityKeccak256(
          ['uint256', 'string'],
          [tokenId, lockPassword]
        );
        lock({
          args: [tokenId, priceInGwei, hashedPassword],
        });
      }}
      onReset={(values, actions) => {
        actions.setValues({
          tokenId: id,
          lockPrice: 0,
          lockPassword: '',
        });
        setOpen(false);
      }}
      validate={({ lockPrice, lockPassword }) => {
        let errors: FormikErrors<FormValues> = {};
        if (lockPrice <= 0) {
          errors.lockPrice = 'Price must be greater than 0.';
        }

        if (lockPassword === '') {
          errors.lockPassword = 'Password cannot be empty.';
        }
        return errors;
      }}
    >
      <Form className="my-4 flex flex-col gap-4">
        <div className="flex">
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
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="font-gmcafe text-lg text-purple" htmlFor="lockPrice">
              Price
            </label>
            <div className="flex items-center gap-2 rounded border-2 border-purple">
              <Field
                className="py-1 pl-2 text-purple focus-within:outline-0"
                type="number"
                id="lockPrice"
                name="lockPrice"
                step="any"
                required
                min={0}
              />
              <span className="pr-2 font-medium text-purple">Ξ</span>
            </div>
            <ErrorMessage
              component="span"
              className="text-right text-xs text-pink"
              name="lockPrice"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label className="font-gmcafe text-lg text-purple" htmlFor="lockPassword">
              Recovery Phrase
            </label>
            <Field
              className="rounded border-2 border-purple bg-white py-1 px-2 text-purple"
              type="password"
              id="lockPassword"
              name="lockPassword"
            />
            <ErrorMessage
              component="span"
              className="text-right text-xs text-pink"
              name="lockPassword"
            />
          </div>
        </div>
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
              value="Lock"
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

export default LockAdvanced;
