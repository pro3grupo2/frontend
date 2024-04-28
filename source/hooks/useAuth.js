import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {me} from '@/api/v1/auth'

const useAuth = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            return router.push('/signin')
        }

        me(token)
            .then(data => {
                if (!data) {
                    return router.push('/signin')
                }
                setUser(data)
                setIsLoading(false)
            })
    }, [router])

    return {user, isLoading}
}

export default useAuth
