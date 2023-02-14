'use client'

import { ArrowLeftIcon } from '@chakra-ui/icons'
import { Avatar, Button, IconButton } from '@chakra-ui/react'
import { Text, Flex } from '@chakra-ui/layout'
import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth, db } from 'firebaseconfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { addDoc, collection } from 'firebase/firestore'
import { getOtherEmail } from 'utils/getOtherEmail'

const Sidebar = () => {
    const router = useRouter()
    const [user] = useAuthState(auth);
    const [snapshot] = useCollection(collection(db, 'chats'))
    const chats = snapshot?.docs.map(obj => ({ id: obj.id, ...obj.data() }))

    const onSignOut = () => {
        alert('are u sure?')
        signOut(auth)
    }

    const chatExits = email => chats?.find(chat => (chat.users.includes(user?.email) && chat.users.includes(email)))

    const newChat = async () => {
        const input = prompt('Enter email')
        if (!chatExits(input) && (input != user?.email)) {
            await addDoc(collection(db, 'chats'), { users: [user?.email, input] })
        }
    }

    return (
        <Flex w={'300px'}
            borderEnd={'1px solid'} borderColor='gray.200' direction={'column'}>

            <Flex w='100%' h='80px' align={'center'} justifyContent='space-between'
                p={3} borderBottom='1px solid' borderColor='gray.200'>
                <Flex align={'center'}>
                    <Avatar marginEnd={3} src={user?.photoURL} />
                    <Text>{user?.displayName}</Text>
                </Flex>
                <IconButton size={'sm'} isRound icon={<ArrowLeftIcon />} aria-label={''} onClick={onSignOut} />
            </Flex>

            <Button marginBottom={5} onClick={newChat}>New Chat</Button>

            <Flex overflowY={'scroll'} direction='column' sx={{ scrollbarWidth: "none" }} flex={1}>
                {
                    chats?.map(chat => (
                        <Flex key={Math.random()} p={3} _hover={{ bg: 'gray.100' }} cursor='pointer' align={'center'}
                            onClick={() => router.push(`/chat/${chat.id}`)}>
                            <Avatar src='' marginEnd={3} />
                            <Text>{getOtherEmail(chat.users, user)}</Text>
                            {/* <Text>{chat.users}</Text> */}
                        </Flex>
                    ))
                }
            </Flex>

        </Flex>
    )
}

export default Sidebar