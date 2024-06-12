// libs
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

type TProps = {
  children: ReactNode | ReactNode[];
  validateSchema: AnyObjectSchema;
  defaultValues?: any;
};
/**
 * ReactHookForm
 * @description FormProvider base on ReactHookForm
 * @param validateSchema - Yup validate schema
 * @param children
 */
export default function ReactHookForm({
  children,
  validateSchema,
  defaultValues,
}: TProps) {
  const formProps = useForm({
    resolver: yupResolver(validateSchema),
    mode: 'onChange',
    defaultValues,
  });

  return <FormProvider {...formProps}>{children}</FormProvider>;
}
