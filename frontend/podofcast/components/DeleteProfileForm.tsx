import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { useDeleteProfile } from '@/api/reactQuery/authMutations'
import { useCurrentUser } from '@/api/reactQuery/authQueries'
import { UUID } from 'crypto'
import useAuthStore from '@/store/useAuthStore'
import { useEffect } from 'react'

const DeleteProfileForm = () => {
	const { errorMessage, clearErrorMessage } = useAuthStore()
	const { mutate, isPending } = useDeleteProfile()
	const { data: user } = useCurrentUser()

	useEffect(() => {
		clearErrorMessage()
	}, [])

	function deleteProfile(userId: UUID) {
		try {
			mutate(userId)
		} catch (error) {
			console.error('Edit profile failed:', error)
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className='button button--alert'>DELETE USER</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='button button--light'>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className='button button--alert'
						type='submit'
						onClick={() => deleteProfile(user?.id as UUID)}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteProfileForm
