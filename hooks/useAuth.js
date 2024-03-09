import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { me } from '@/api/v1/auth';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/signin');
            return;
        }

        me(token)
            .then(data => {
                setUser(data);
                setIsLoading(false);
            })
            .catch(() => {
                router.push('/signin');
            });
    }, [router]);

    return { user, isLoading };
};

export default useAuth;
