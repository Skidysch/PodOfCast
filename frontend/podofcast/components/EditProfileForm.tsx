import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import Loader from '@/components/Loader'
import '/app/styles/forms.css'
import { AnimatePresence, motion } from 'framer-motion'

import { useEditProfile } from '@/api/reactQuery/authMutations'
import { useCurrentUser } from '@/api/reactQuery/authQueries'
import { UUID } from 'crypto'
import useAuthStore from '@/store/useAuthStore'
import { useEffect } from 'react'

const EditProfileSchema = z.object({
	first_name: z
		.string()
		.max(20, { message: 'Must not exceed 20 symbols' })
		.optional(),
	last_name: z
		.string()
		.max(20, { message: 'Must not exceed 20 symbols' })
		.optional(),
	is_company: z.boolean().optional(),
	company_name: z
		.string()
		.max(100, { message: 'Must not be more than 100 letters length' })
		.optional(),
	bio: z.string().optional(),
	// TODO: convert image to right format and send to backend
	profile_image: z.any(),
	date_of_birth: z.string().optional(),
})

const EditProfileForm = () => {
	const { errorMessage, clearErrorMessage } = useAuthStore()
	const { mutate, isPending } = useEditProfile()
	const { data: user } = useCurrentUser()

	const form = useForm<z.infer<typeof EditProfileSchema>>({
		resolver: zodResolver(EditProfileSchema),
		defaultValues: {
			first_name: user?.first_name,
			last_name: user?.last_name,
			is_company: user?.is_company,
			company_name: user?.company_name,
			profile_image: null,
			bio: user?.bio,
			date_of_birth: user?.date_of_birth,
		},
	})

	const isCompany = form.watch('is_company')
	const profileImageRef = form.register('profile_image')

	useEffect(() => {
		clearErrorMessage()
	}, [])

	// TODO: Figure out the way to close form onSuccess
	function onSubmit(values: z.infer<typeof EditProfileSchema>) {
		try {
			values.profile_image = values.profile_image[0]
			mutate({ data: values, userId: user?.id as UUID })
		} catch (error) {
			console.error('Edit profile failed:', error)
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='button'>EDIT PROFILE</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='form max-w-2xl min-h-96'
					>
						<FormField
							control={form.control}
							name='first_name'
							render={({ field }) => (
								<FormItem className='form-item'>
									<FormLabel className='form-label'>First Name</FormLabel>
									<FormControl>
										<Input
											className='form-input'
											placeholder='First Name'
											{...field}
										/>
									</FormControl>
									<FormMessage className='form-error' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='last_name'
							render={({ field }) => (
								<FormItem className='form-item'>
									<FormLabel className='form-label'>Last Name</FormLabel>
									<FormControl>
										<Input
											className='form-input'
											placeholder='Last Name'
											{...field}
										/>
									</FormControl>
									<FormMessage className='form-error' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='is_company'
							render={({ field }) => (
								<FormItem className='flex items-center space-x-2 self-start'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel className='form-label'>
										Do you represent some company?
									</FormLabel>
								</FormItem>
							)}
						/>
						<AnimatePresence>
							{isCompany && (
								<motion.div
									key='company_name'
									className='w-full'
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3, ease: 'easeInOut' }}
								>
									<FormField
										control={form.control}
										name='company_name'
										render={({ field }) => (
											<FormItem className='form-item'>
												<FormLabel className='form-label'>
													Company Name <span className='text-primary'>*</span>
												</FormLabel>
												<FormControl>
													<Input
														className='form-input'
														placeholder='Company Name'
														{...field}
													/>
												</FormControl>
												<FormMessage className='form-error' />
											</FormItem>
										)}
									/>
								</motion.div>
							)}
						</AnimatePresence>
						<FormField
							control={form.control}
							name='bio'
							render={({ field }) => (
								<FormItem className='form-item'>
									<FormLabel className='form-label'>Bio</FormLabel>
									<FormControl>
										<textarea
											className='form-input'
											placeholder='Tell us about yourself'
											{...field}
										/>
									</FormControl>
									<FormMessage className='form-error' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='profile_image'
							render={({ field }) => (
								<FormItem className='form-item flex flex-col'>
									<FormLabel className='form-label'>Profile Image</FormLabel>
									<FormControl>
										<Input
											type='file'
											className='form-file-input'
											{...profileImageRef}
										/>
									</FormControl>
									<FormMessage className='form-error' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='date_of_birth'
							render={({ field }) => (
								<FormItem className='form-item'>
									<FormLabel className='form-label'>Date of Birth</FormLabel>
									<FormControl>
										<Input
											className='form-input'
											type='date'
											placeholder='Date of Birth'
											{...field}
										/>
									</FormControl>
									<FormMessage className='form-error' />
								</FormItem>
							)}
						/>
						{errorMessage && <p className='form-error'>{errorMessage}</p>}
						<DialogFooter>
							<Button type='submit'>{isPending ? <Loader /> : 'SUBMIT'}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default EditProfileForm
