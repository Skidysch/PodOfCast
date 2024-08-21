'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
	User,
	UserActivation,
	UserOnboarding,
	UserLogin,
	OAuthLogin,
	OAuthAuthenticate,
	UserRegister,
	UserResetPassword,
	UserRestorePassword,
	OAuthLoginResponse,
	EditProfileData,
} from '@/types/auth'
import {
	activation,
	onboarding,
	login,
	oAuthLogin,
	logout,
	register,
	resetPassword,
	restorePassword,
	oAuthAuthenticate,
	editProfile,
	deleteProfile,
} from '@/api/reactQuery/authApi'
import useAuthStore from '@/store/useAuthStore'
import { AxiosError } from 'axios'
import { UUID } from 'crypto'

export const useRegister = () => {
	const router = useRouter()
	const { setConfirmationEmail, setErrorMessage } = useAuthStore()

	return useMutation({
		mutationFn: (data: UserRegister) => register(data),
		onMutate: () => {
			console.log('register mutate')
		},
		onError: () => {
			console.log('register error')
		},
		onSuccess: async (user: User) => {
			console.log('register success')
			try {
				setConfirmationEmail(user.email)
				router.push('/sign-up/confirm')
			} catch (error) {
				throw error
			}
		},
		onSettled: (_, error: AxiosError | null) => {
			console.log('register settle')
			if (error) {
				const errorMessage = Object.values(
					JSON.parse(error?.request.response)
				)[0] as string
				console.log(error)
				setErrorMessage(errorMessage)
			}
		},
	})
}

export const useLogin = () => {
	const router = useRouter()
	const { setIsAuthenticated, setErrorMessage } = useAuthStore()

	return useMutation({
		mutationFn: (data: UserLogin) => login(data),
		onMutate: () => {
			console.log('login mutate')
		},
		onSuccess: async (user: User) => {
			console.log('login success')

			if (!user.is_onboarded) {
				router.push('/onboarding')
			} else {
				router.push('/profile/me')
			}
		},
		onError: () => {
			console.log('login error')
		},
		onSettled: async (_, error: AxiosError | null) => {
			console.log('login settle')
			if (error) {
				const errorMessage = Object.values(
					JSON.parse(error?.request.response)
				)[0] as string
				setErrorMessage(errorMessage)
			} else {
				setIsAuthenticated(true)
			}
		},
	})
}

export const useEditProfile = () => {
	const router = useRouter()
	const { setErrorMessage } = useAuthStore()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ data, userId }: { data: EditProfileData; userId: UUID }) =>
			editProfile({ data, userId }),
		onMutate: () => {
			console.log('edit profile mutate')
		},
		onSuccess: async (user: User) => {
			queryClient.invalidateQueries({ queryKey: ['current-user'] })
			console.log('edit profile success')
		},
		onError: () => {
			console.log('edit profile error')
		},
		onSettled: async (_, error: AxiosError | null) => {
			console.log('edit profile settle')
			if (error) {
				const errorMessage = Object.values(
					JSON.parse(error?.request.response)
				)[0] as string
				setErrorMessage(errorMessage)
			} else {
				router.push('/profile/me')
			}
		},
	})
}

export const useDeleteProfile = () => {
	const router = useRouter()
	const { setErrorMessage } = useAuthStore()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (userId: UUID) => deleteProfile(userId),
		onMutate: () => {
			console.log('delete profile mutate')
		},
		onSuccess: async () => {
			console.log('delete profile success')
		},
		onError: () => {
			console.log('delete profile error')
		},
		onSettled: async (_, error: AxiosError | null) => {
			console.log('delete profile settle')
			if (error) {
				const errorMessage = Object.values(
					JSON.parse(error?.request.response)
				)[0] as string
				setErrorMessage(errorMessage)
			} else {
				queryClient.invalidateQueries({ queryKey: ['current-user'] })
				await logout()
			}
		},
	})
}

export const useOAuthLogin = () => {
	const { setProvider } = useAuthStore()

	return useMutation({
		mutationFn: (data: OAuthLogin) => oAuthLogin(data),
		onSuccess: (data: OAuthLoginResponse) => {
			console.log('oauth login success')
			setProvider(data.provider!)
			window.location.href = data.authorizationUrl
		},
		onError: () => {
			console.log('oauth login error')
		},
	})
}

export const useOAuthAuthenticate = () => {
	const router = useRouter()
	const { setIsAuthenticated, clearProvider } = useAuthStore()

	return useMutation({
		mutationFn: (data: OAuthAuthenticate) => oAuthAuthenticate(data),
		onSuccess: (user: User) => {
			console.log('oauth authenticate success')
			setIsAuthenticated(true)
			if (!user.is_onboarded) {
				router.push('/onboarding')
			} else {
				router.push('/profile/me')
			}
		},
		onError: () => {
			console.log('oauth authenticate error')
		},
		onSettled: async (_, error) => {
			console.log('oauth authenticate settle')
			if (error) {
				console.log(error)
			} else {
				clearProvider()
			}
		},
	})
}

export const useLogout = () => {
	const router = useRouter()

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			console.log('logout success')
			router.push('/sign-in')
		},
	})
}

export const useActivation = () => {
	const router = useRouter()

	return useMutation({
		mutationFn: (data: UserActivation) => activation(data),
		onMutate: () => {
			console.log('activation mutate')
		},
		onSuccess: () => {
			console.log('activation success')
			router.push('/activation/done')
		},
	})
}

export const useOnboarding = () => {
	const router = useRouter()
	const { setErrorMessage } = useAuthStore()

	return useMutation({
		mutationFn: ({ data, userId }: { data: UserOnboarding; userId: UUID }) =>
			onboarding({ data, userId }),
		onMutate: () => {
			console.log('onboarding mutate')
		},
		onSuccess: async (user: User) => {
			console.log('onboarding success')
		},
		onError: () => {
			console.log('onboarding error')
		},
		onSettled: async (_, error: AxiosError | null) => {
			console.log('onboarding settle')
			if (error) {
				const errorMessage = Object.values(
					JSON.parse(error?.request.response)
				)[0] as string
				setErrorMessage(errorMessage)
			} else {
				router.push('/profile/me')
			}
		},
	})
}

export const useRestorePassword = () => {
	const router = useRouter()
	const { setErrorMessage, setConfirmationEmail } = useAuthStore()

	return useMutation({
		mutationFn: (data: UserRestorePassword) => restorePassword(data),
		onSuccess: (data: UserRestorePassword) => {
			console.log('restore password success')
			setConfirmationEmail(data.email)
			router.push('/restore-password/done')
		},
		onError: () => {
			console.log('restore password error')
		},
		onSettled: (_, error: AxiosError | null) => {
			console.log('restore password settle')
			if (error) {
				const errorMessage = Object.values(
					JSON.parse(error?.request.response)
				)[0] as string
				setErrorMessage(errorMessage)
			}
		},
	})
}

export const useResetPassword = () => {
	const router = useRouter()
	const { setErrorMessage } = useAuthStore()

	return useMutation({
		mutationFn: (data: UserResetPassword) => resetPassword(data),
		onSuccess: () => {
			console.log('reset password success')
			router.push('/password/reset/done')
		},
		onError: () => {
			console.log('reset password error')
		},
		onSettled: (_, error: AxiosError | null) => {
			console.log('reset password settle')
			if (error) {
				const errorMessage = Object.values(
					JSON.parse(error?.request.response)
				)[0] as string
				setErrorMessage(errorMessage)
			}
		},
	})
}
