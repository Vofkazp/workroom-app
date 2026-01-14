import {useEffect} from "react";
import {useFormikContext} from "formik";

type Props = {
  onCheck: (phone: string) => void;
};

export default function PhoneAutoCheck({onCheck}: Props) {
  const {values} = useFormikContext<{
    phone: string;
    phone_prefix: number;
  }>();

  useEffect(() => {
    if (values.phone.length === 11) onCheck("+" + values.phone_prefix + values.phone);
  }, [values.phone, values.phone_prefix]);

  return null;
}