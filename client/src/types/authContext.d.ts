export type UserProps = {
  login?: () => void;
  logout?: () => void;
  name?: string;
  id?: number;
  isAuthenticated?: boolean;
  children?: JSX.Element;
};

export type UserFormState = {
  id: number;
  name: string;
  password: string;
  isLogged: boolean;
};

export type UserFormProps = {
  handleSubmit: (user: UserFormState) => void;
};

export type RegisterFormState = {
  id: number;
  name: string;
  password: string;
  isLogged: boolean;
  email: string;
  confirmPassword: string;
};
export type RegisterFormProps = {
	handleSubmit: (user: RegisterFormState) => void;
  };