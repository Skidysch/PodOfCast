'use client'

import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { Input } from '@/components/ui/input'
import Loader from '@/components/Loader'

import { useOnboarding } from '@/api/reactQuery/authMutations'
import { useCurrentUser } from '@/api/reactQuery/authQueries'
import useAuthStore from '@/store/useAuthStore'

import '@/app/styles/forms.css'
import { AnimatePresence, motion } from 'framer-motion'
import { UUID } from 'crypto'

const OnboardingSchema = z.object({
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

const OnboardingForm = () => {
	const { errorMessage, clearErrorMessage } = useAuthStore()
	const { data: user } = useCurrentUser()
	const { mutate, isPending } = useOnboarding()

	const [step, setStep] = useState(1)
	const nextStep = () => setStep(prev => prev + 1)
	const prevStep = () => setStep(prev => prev - 1)

	useEffect(() => {
		clearErrorMessage()
	}, [])

	const form = useForm<z.infer<typeof OnboardingSchema>>({
		resolver: zodResolver(OnboardingSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			is_company: false,
			company_name: '',
			profile_image: null,
			bio: '',
			date_of_birth: '',
		},
	})

	const isCompany = form.watch('is_company')
	const profileImageRef = form.register('profile_image')

	function onSubmit(values: z.infer<typeof OnboardingSchema>) {
		try {
			values.profile_image = values.profile_image[0]
			mutate({ data: values, userId: user?.id as UUID })
		} catch (error) {
			console.error('Onboarding failed:', error)
		}
	}

	return (
		<div className='flex flex-col items-center gap-10'>
			<h1 className='text-4xl md:text-6xl text-center font-bold leading-tight tracking-tight'>
				Tell us more about yourself
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='form max-w-2xl min-h-96'
				>
					<AnimatePresence>
						<div className='flex w-full'>
							{step === 1 && (
								<motion.div
									key='step1'
									initial={{ opacity: 0, x: '100%' }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: '-100%' }}
									transition={{ duration: 0.5, ease: 'easeInOut' }}
									className='flex flex-col gap-5 w-full'
								>
									<FormField
										control={form.control}
										name='first_name'
										render={({ field }) => (
											<FormItem className='form-item'>
												<FormLabel className='form-label'>
													First Name <span className='text-primary'>*</span>
												</FormLabel>
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
												<FormLabel className='form-label'>
													Last Name <span className='text-primary'>*</span>
												</FormLabel>
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
																Company Name{' '}
																<span className='text-primary'>*</span>
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
								</motion.div>
							)}

							{step === 2 && (
								<motion.div
									key='step2'
									initial={{ opacity: 0, x: '100%' }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: '-100%' }}
									transition={{ duration: 0.5, ease: 'easeInOut' }}
									className='flex flex-col gap-5 w-full'
								>
									<FormField
										control={form.control}
										name='bio'
										render={({ field }) => (
											<FormItem className='form-item'>
												<FormLabel className='form-label'>
													Bio <span className='text-primary'>*</span>
												</FormLabel>
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
								</motion.div>
							)}

							{step === 3 && (
								<motion.div
									key='step3'
									initial={{ opacity: 0, x: '100%' }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: '-100%' }}
									transition={{ duration: 0.5, ease: 'easeInOut' }}
									className='flex flex-col gap-5 w-full'
								>
									<FormField
										control={form.control}
										name='profile_image'
										render={({ field }) => (
											<FormItem className='form-item flex flex-col'>
												<FormLabel className='form-label'>
													Profile Image <span className='text-primary'>*</span>
												</FormLabel>
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
								</motion.div>
							)}

							{step === 4 && (
								<motion.div
									key='step4'
									initial={{ opacity: 0, x: '100%' }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: '-100%' }}
									transition={{ duration: 0.5, ease: 'easeInOut' }}
									className='flex flex-col gap-5 w-full'
								>
									<FormField
										control={form.control}
										name='date_of_birth'
										render={({ field }) => (
											<FormItem className='form-item'>
												<FormLabel className='form-label'>
													Date of Birth <span className='text-primary'>*</span>
												</FormLabel>
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
								</motion.div>
							)}
						</div>
					</AnimatePresence>

					<div className='w-full flex justify-between mt-10 flex-wrap gap-5'>
						{step > 1 && (
							<Button
								type='button'
								className='button form-button'
								onClick={prevStep}
								disabled={step === 1}
							>
								PREVIOUS
							</Button>
						)}
						{step < 4 && (
							<Button
								className='button form-button ml-auto'
								type='button'
								onClick={nextStep}
								disabled={step === 4}
							>
								NEXT
							</Button>
						)}
						{step === 4 && (
							<Button
								className='button form-button ml-auto'
								type='submit'
								disabled={isPending}
							>
								{isPending ? <Loader /> : 'SUBMIT'}
							</Button>
						)}
					</div>
					{errorMessage && <p className='form-error'>{errorMessage}</p>}
				</form>
			</Form>
		</div>
	)
}

export default OnboardingForm
