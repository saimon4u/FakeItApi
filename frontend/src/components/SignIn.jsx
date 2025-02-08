import React from 'react'
import { LogIn } from 'lucide-react'
import { Input } from 'antd'
import { User } from 'lucide-react'
import { Mail } from 'lucide-react'
import { LockIcon } from 'lucide-react'
import { Button } from 'antd'
export default function SignIn() {
	return (
		<div className='w-screen h-screen flex justify-center items-center bg-gradient-to-b from-sky-200 to-white'>
			<div className='w-[50vw] h-[60vh] rounded-xl flex flex-col items-center p-8 shadow-[0_-10px_20px_10px_rgba(0,0,0,0.3)]'>
				<div className='p-2 rounded-2xl bg-white'>
					<LogIn size='56' />
				</div>
				<span className='my-2 text-lg text-center'>Log in to your account to create and manage mock API endpoints. Securely authenticate and generate dynamic mock data for testing with ease.</span>
				<div className='mx-20 w-xl mt-10 border border-black rounded-md'>
					<Input placeholder="Enter username" size='middle' variant='outlined' prefix={<User />} />
				</div>
				<div className='mx-20 w-xl mt-5 border border-black rounded-md'>
					<Input placeholder="Enter email" size='middle' variant='outlined' prefix={<Mail />} />
				</div>
				<div className='mx-20 w-xl mt-5 border border-black rounded-md'>
					<Input placeholder="Enter password" size='middle' variant='outlined' prefix={<LockIcon />} />
				</div>
				<div className='mx-20 w-xl mt-10 border rounded-md'>
					<Button block color="black" variant="outlined">
						Sign In
					</Button>
				</div>
			</div>
		</div>
	)
}

