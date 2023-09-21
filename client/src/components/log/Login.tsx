import {useRef, useEffect, startTransition, lazy, Suspense, LazyExoticComponent, ComponentType} from 'react';
import {useNavigate} from 'react-router';
import {Button} from '../buttonsLogin/Button';
import InputForm from '../inputsform/InputForm';
import {LoginContainer} from './loginContainer.styles';
import {useState, ChangeEventHandler, MouseEventHandler} from 'react';
import {UserFormState} from '../../types/authContext';
import LoginLoader from '../../assets/skeleton/LoginSkeleton';

type User = UserFormState & {id: number};

const LazyInput: LazyExoticComponent<ComponentType<any>> = lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => {
			return resolve(import('../inputsform/InputForm'));
		}, 3000);
	});
});

const InitialValue: UserFormState = {
	id: Date.now(),
	name: '',
	password: '',
	isLogged: true,
};
export const Login = () => {
	const [form, setForm] = useState(InitialValue);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);
	const navigate = useNavigate();

	const handleSubmit = (user: UserFormState) => {
		startTransition(() => {
			setTimeout(() => {
				setForm({...form, id: Date.now()});
			}, 2000);
			localStorage.setItem('form', JSON.stringify(form));
		});
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = ({target}) => {
		const name = target.name as keyof UserFormState;
		setForm({...form, [name]: target.value});
	};

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();

		startTransition(() => {
			if (form.name.trim() !== '' || form.password.trim() !== '') {
				handleSubmit(form);
				setForm(InitialValue);
				navigate('/home');
			} else {
				return;
			}
		});
	};

	return (
		<>
			<LoginContainer>
				<h2 className="logincontainer__h2">Log In </h2>

				<div className="logincontainer__div">
					<Suspense fallback={<LoginLoader />}>
						<LazyInput inputRef={inputRef} placeholder="Insert user name" type="text" name="name" handleChange={handleChange} value={form.name} />
					</Suspense>
				</div>

				<div>
					<Suspense fallback={<LoginLoader />}>
						<LazyInput placeholder="Insert user password" type="password" name="password" handleChange={handleChange} value={form.password} />
					</Suspense>
				</div>

				{form.name === '' || form.password === '' ? (
					<Button isDisabled={true} handleClick={handleClick}>
						Log In
					</Button>
				) : (
					<Button isDisabled={false} handleClick={handleClick}>
						Log In
					</Button>
				)}
			</LoginContainer>
		</>
	);
};
