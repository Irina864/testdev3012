'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import UserMode from '@/auth/UserMode';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/vacancies');
  }, []);

  return (
    <main className={styles.main}>
      <UserMode />
    </main>
  );
}
