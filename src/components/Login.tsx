'use client'

import { ChatIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Stack } from '@chakra-ui/react'
import { auth } from 'firebaseconfig'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (
        <Center h={'100vh'}>
            <Stack align={'center'} bgColor='gray.600' p={16} rounded={'3xl'} spacing={12} boxShadow='1g'>
                <Box bgColor={'blue.500'} w='fit-content' p={5} rounded={'3xl'} boxShadow={'md'}>
                    <ChatIcon w={100} h={100} />
                </Box>
                <Button boxShadow={'md'} onClick={() => signInWithGoogle('', { prompt: 'select_account' })}>
                    Sign in with Google
                </Button>
            </Stack>
        </Center>
    )
}

export default Login