import { fetchApiData } from "@/app/api/appService"

export const fetchNotification = async (accessToken: string) => {
    const response = await fetchApiData('/api/user/notifications', 'GET', null, accessToken)
    if (response.success) {
        return response.data.notifications
    }
}