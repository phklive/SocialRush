import React from 'react'
import { Formik, Form, Field } from 'formik'

interface SignupProps {}

interface InitialValues {
	username: string
	email: string
	password: string
	confirmPassword: string
}

const initialValues: InitialValues = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const Signup: React.FC<SignupProps> = () => {
	return (
		<Formik initialValues={initialValues} onSubmit={() => {}}>
			<Form>
				<Field name="username" type="text" placeholder="Username" />
			</Form>
		</Formik>
	)
}

export default Signup
