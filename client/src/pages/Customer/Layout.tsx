import Layout from "@/layout/Layout"
const CustomerLayout = () => {
    return (
        <Layout tabs={[
            { index: 0, label: 'Add New', to: '/customer/add-new-customer' },
            { index: 1, label: 'Manage Customers', to: '/customer/existing-customers' }]} />
    )
}

export default CustomerLayout