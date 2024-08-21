'use client'

import { useCurrentUser } from '@/api/reactQuery/authQueries'
import Link from 'next/link'
import {
	StyledInstagramIcon,
	StyledTiktokIcon,
	StyledTwitterIcon,
} from '@/components/StyledSVG'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { useRedirectIfNotAuthenticated } from '@/hooks/useRedirect'
import EditProfileForm from '@/components/EditProfileForm'
import { SocialListProps } from '@/types'
import { formatRelativeDateTime } from '@/lib/utils'
import DeleteProfileForm from '@/components/DeleteProfileForm'

const page = () => {
	useRedirectIfNotAuthenticated()
	const { data: user } = useCurrentUser()
	const SocialList: SocialListProps[] = [
		{
			link: 'https://twitter.com',
			item: <StyledTwitterIcon />,
		},
		{
			link: 'https://instagram.com',
			item: <StyledInstagramIcon />,
		},
		{
			link: 'https://tiktok.com',
			item: <StyledTiktokIcon />,
		},
	]

	return (
		<div className='container grid grid-cols-12 grid-rows-[auto auto auto auto] md:grid-rows-[auto auto auto] gap-5'>
			<div className='p-4 md:p-8 bg-profile-header-gradient col-span-full rounded-2xl flex max-md:flex-col gap-5 justify-between items-center md:items-end'>
				<div className='flex flex-col max-md:items-center'>
					<div className='w-[120px] h-[120px] overflow-hidden rounded-full border-2 border-background flex items-center justify-center'>
						<Avatar>
							<AvatarImage
								src={user?.profile_images?.[1]?.url}
								width={120}
								height={120}
							/>
							<AvatarFallback className='text-5xl font-semibold'>
								{user?.get_full_name[0]}
							</AvatarFallback>
						</Avatar>
					</div>
					<div className='mt-4 flex items-center'>
						<h3 className='font-bold text-3xl lg:text-4xl'>
							{user?.get_full_name}
						</h3>
					</div>
					<ul className='flex gap-4 mt-3'>
						{SocialList.map(socialItem => (
							<Link
								key={socialItem.link}
								className='w-6 h-6 flex justify-center items-center'
								href={socialItem.link}
							>
								{socialItem.item}
							</Link>
						))}
					</ul>
				</div>
				<div className='flex max-lg:flex-col gap-5 lg:gap-20 justify-between'>
					<div className='grid grid-cols-[auto, auto] grid-rows-3 gap-x-6 grid-flow-col'>
						<p className='text-xs sm:text-sm font-medium text-desctruction'>
							Email
						</p>
						<p className='text-xs sm:text-sm font-medium text-desctruction'>
							Date of Birth
						</p>
						<p className='text-xs sm:text-sm font-medium text-desctruction'>
							Podofcaster since
						</p>
						<p className='font-bold text-xs sm:text-sm text-primary'>
							{user?.email}
						</p>
						<p className='font-bold text-xs sm:text-sm text-primary'>
							{user?.date_of_birth
								? formatRelativeDateTime(user?.date_of_birth)
								: 'Not set'}
						</p>
						<p className='font-bold text-xs sm:text-sm text-primary'>
							{user?.date_joined
								? formatRelativeDateTime(user?.date_joined)
								: 'Not set'}
						</p>
					</div>
					<div className='flex lg:flex-col max-lg:justify-between gap-2'>
						<EditProfileForm />
						<DeleteProfileForm />
					</div>
				</div>
			</div>
			<div className='p-5 col-span-full md:col-span-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl flex flex-col gap-3'>
				<div className='flex justify-between'>
					<h4 className='font-bold text-2xl'>Bio</h4>
				</div>
				<p className='font-medium text-sm text-destruction'>
					{user?.bio || 'Write some info about you there'}
				</p>
			</div>
			<div className='p-8 col-span-full md:col-span-8 md:row-span-2 bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl'>
				Dashboard goes here
			</div>
			<div className='p-5 row-start-3 col-span-full md:col-span-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl'>
				<div className='flex justify-between'>
					<h4 className='font-bold text-2xl'>Notifications</h4>
				</div>
			</div>
		</div>
	)
}

export default page
