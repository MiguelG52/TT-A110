// src/components/AuthGuard.tsx
'use client';

import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

export const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/auth/sign-in'); 
        }
    }, [token]);

    if (!token) return null;

    return <>{children}</>;
};
