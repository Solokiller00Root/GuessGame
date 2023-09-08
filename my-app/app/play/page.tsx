'use client'
import Game from '@/components/Game';
import useSecurePagesSession from '@/contants/SecurePagesSession';

export default function Play() {
  const session = useSecurePagesSession();

    if (!session) {
        return <div>loading...</div>;
    }
    
  return (
    <div>
      <Game />
    </div>
  );
}