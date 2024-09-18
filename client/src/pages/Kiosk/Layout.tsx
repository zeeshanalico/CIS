import Layout from "@/layout/Layout"
const KioskLayout = () => {
    return (
        <Layout tabs={[
            { index: 0, label: 'Add New', to: '/kiosk/add-new-kiosk' },
            { index: 1, label: 'Manage Kiosks', to: '/kiosk/exsited-kiosks' }]} />
    )
}

export default KioskLayout