import Layout from "@/layout/Layout"
const UserLayout = () => {
    return (
        <Layout tabs={[
            { index: 0, label: 'Create New', to: '/user/create-user' },
            { index: 1, label: 'Manage Users', to: '/user/existing-users' }]} />
    )
}

export default UserLayout