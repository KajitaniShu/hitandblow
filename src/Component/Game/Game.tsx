import React from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

export function Game({user} : any) {
  
  const [userData, userDataloading, usrDataError, usrDataSnapshot, usrDataReload] = useDocumentDataOnce(user?.uid);
  return (
    <div>Game</div>
  )
}
