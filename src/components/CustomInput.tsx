import { Input, IInputProps } from "native-base";

type Props = IInputProps & {};

export default function CustomInput({ ...rest }: Props) {
  return <Input borderColor="personColors.150" borderWidth={0.2} w="80%" {...rest}/>;
}
