import { Dialog } from '@headlessui/react';
import { utils } from 'ethers';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { useContractWrite } from 'wagmi';
import { gmooContract, gmooABI } from '../../lib/util/addresses';

type FormValues = {
  tokenId: string;
  lockPrice: number;
  lockPassword: string;
};

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LockModal = ({ id, open, setOpen }: Props) => {
  const { write: lock } = useContractWrite({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'lockMoo',
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-screen-sm rounded-xl bg-white p-8">
          <Dialog.Title className="font-gmcafe text-3xl text-purple">Lock Moo</Dialog.Title>
          <Dialog.Description className="text-purple">
            Locking your moo will give you special benefits...
          </Dialog.Description>
          <Formik
            initialValues={{
              tokenId: id,
              lockPrice: 0,
              lockPassword: '',
            }}
            onSubmit={({ tokenId, lockPrice, lockPassword }) => {
              const priceInGwei = utils.parseEther(lockPrice.toString());
              const hashedPassword = utils.keccak256(utils.toUtf8Bytes(lockPassword));
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
                <div className="flex flex-col">
                  <label className="font-gmcafe text-lg text-purple" htmlFor="lockPassword">
                    Password
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
                  className="cursor-pointer rounded-xl border-2 border-purple px-4 py-1 font-gmcafe text-xl text-purple"
                  type="reset"
                  value="Cancel"
                />
                <Field
                  className="cursor-pointer rounded-xl bg-purple px-4 py-1 font-gmcafe text-xl text-white"
                  type="submit"
                  value="Lock"
                />
              </div>
            </Form>
          </Formik>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LockModal;
