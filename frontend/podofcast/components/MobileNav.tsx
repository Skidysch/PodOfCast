import { useLogout } from '@/api/reactQuery/authMutations'
import { useCurrentUser } from '@/api/reactQuery/authQueries'
import Burger from '@/components/Burger'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet'
import { HeaderLinks } from '@/constants'
import useAuthStore from '@/store/useAuthStore'
import Link from 'next/link'
import { useState } from 'react'

const MobileNav = () => {
	const { isAuthenticated } = useAuthStore()
	const { data: user } = useCurrentUser()
	const { mutate } = useLogout()
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)

	const handleLogout = () => {
		setIsDropdownVisible(false)
		mutate()
	}

	return (
		<Sheet>
			<SheetTrigger>
				<Burger />
			</SheetTrigger>
			<SheetContent className='w-full sm:w-[400px] gap-20 flex flex-col justify-center'>
				<div className='flex flex-col gap-5 items-center'>
					{isAuthenticated ? (
						// Can't use UserMenuButton because of SheetClose
						<div className='relative'>
							<Button
								className='p-0 border border-black rounded-full overflow-hidden'
								onClick={() => setIsDropdownVisible(!isDropdownVisible)}
							>
								<Avatar>
									<AvatarImage
										src={user?.profile_images?.[1]?.url}
										width={40}
										height={40}
									/>
									<AvatarFallback className="text-black text-2xl w-10 h-10">{user?.get_full_name[0]}</AvatarFallback>
								</Avatar>
							</Button>
							<div
								className={`overflow-hidden w-full absolute right-0 top-16 p-5 bg-secondary rounded-lg transition-all duration-300 ease-in-out ${
									isDropdownVisible
										? 'opacity-100 translate-y-0'
										: 'opacity-0 translate-y-full pointer-events-none'
								}`}
							>
								<ul className='flex flex-col gap-4 items-center'>
									<li>
										<SheetClose asChild>
											<Button
												variant='outline'
												className={`button button--light transition-transform duration-300 ease-in-out delay-50 ${
													isDropdownVisible
														? 'translate-x-0'
														: 'translate-x-[200%]'
												}`}
												asChild
											>
												<Link href='/profile/me'>Profile</Link>
											</Button>
										</SheetClose>
									</li>
									<li>
										<SheetClose asChild>
											<Button
												variant='outline'
												className={`button button--light transition-transform duration-300 ease-in-out delay-100 ${
													isDropdownVisible
														? 'translate-x-0'
														: 'translate-x-[200%]'
												}`}
												asChild
											>
												<Link href='#'>RECENT EPISODES</Link>
											</Button>
										</SheetClose>
									</li>
									<li>
										<SheetClose asChild>
											<Button
												variant='outline'
												className={`button button--light transition-transform duration-300 ease-in-out delay-150 ${
													isDropdownVisible
														? 'translate-x-0'
														: 'translate-x-[200%]'
												}`}
												onClick={() => mutate()}
											>
												Logout
											</Button>
										</SheetClose>
									</li>
								</ul>
							</div>
						</div>
					) : (
						<div className='flex flex-col gap-5 items-center'>
							<SheetClose asChild>
								<Button className='button' asChild>
									<Link href='/sign-in'>SIGN IN</Link>
								</Button>
							</SheetClose>
							<SheetClose asChild>
								<Button className='button' asChild>
									<Link href='/sign-up'>SIGN UP</Link>
								</Button>
							</SheetClose>
						</div>
					)}
				</div>
				<ul className='flex flex-col gap-10 items-center leading-[1.6] font-bold'>
					{HeaderLinks.map(item => (
						<SheetClose asChild>
							<Link
								key={item.name}
								href={item.link}
								className='hover:text-primary transition-colors duration-300 ease-in-out'
							>
								<li>{item.name}</li>
							</Link>
						</SheetClose>
					))}
				</ul>
			</SheetContent>
		</Sheet>
	)
}

export default MobileNav
