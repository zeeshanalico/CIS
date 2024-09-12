import Layout from "@/layout/Layout"

const InventoryLayout = () => {
  return (
    <Layout tabs={[
      { label: 'Add New', to: '/inventory/add-new-inventory' },
      { label: 'Stock', to: '/inventory/stock' }]} />
  )
}

export default InventoryLayout