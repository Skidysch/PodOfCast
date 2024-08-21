import { useLogout } from '@/api/reactQuery/authMutations'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'
import { useCurrentUser } from '@/api/reactQuery/authQueries'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserMenuButton = () => {
	const { data: user } = useCurrentUser()
	const { mutate } = useLogout()
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)

	return (
		<div className='relative'>
			<Button
				className='p-0 border border-black rounded-full overflow-hidden'
				onClick={() => setIsDropdownVisible(!isDropdownVisible)}
			>
				<Avatar>
					<AvatarImage
						src={user?.profile_images?.[2]?.url}
						width={40}
						height={40}
					/>
					<AvatarFallback className="text-black text-2xl w-10 h-10">{user?.get_full_name[0]}</AvatarFallback>
				</Avatar>
			</Button>
			<div
				className={`overflow-hidden w-fit absolute right-0 top-16 p-5 bg-secondary rounded-lg transition-all duration-300 ease-in-out ${
					isDropdownVisible
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-full pointer-events-none'
				}`}
			>
				<ul className='flex flex-col gap-4 items-center'>
					<li>
						<Button
							variant='outline'
							className={`button button--light transition-transform duration-300 ease-in-out delay-50 ${
								isDropdownVisible ? 'translate-x-0' : 'translate-x-[200%]'
							}`}
							asChild
						>
							<Link href='/profile/me'>Profile</Link>
						</Button>
					</li>
					<li>
						<Button
							variant='outline'
							className={`button button--light transition-transform duration-300 ease-in-out delay-100 ${
								isDropdownVisible ? 'translate-x-0' : 'translate-x-[200%]'
							}`}
							asChild
						>
							<Link href='#'>RECENT EPISODES</Link>
						</Button>
					</li>
					<li>
						<Button
							variant='outline'
							className={`button button--light transition-transform duration-300 ease-in-out delay-150 ${
								isDropdownVisible ? 'translate-x-0' : 'translate-x-[200%]'
							}`}
							onClick={() => mutate()}
						>
							Logout
						</Button>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default UserMenuButton
