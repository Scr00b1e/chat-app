export const getOtherEmail = (users: any[], currentUser: { email: any }) => {
    return users?.filter((obj: any) => obj !== currentUser.email)[0]
}