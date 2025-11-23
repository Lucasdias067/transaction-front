import { api } from '@/lib/axios'

interface UploadUserAvatarResponse {
  avatarUrl: string
}

interface UploadUserAvatarParams {
  id: string
  data: FormData
}

export async function uploadUserAvatar({
  id,
  data
}: UploadUserAvatarParams): Promise<UploadUserAvatarResponse> {
  const response = await api.post(`/users/${id}/upload-avatar`, data)

  return response.data
}
