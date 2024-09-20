import Layout from "@/layout/Layout"

const InventoryLayout = () => {
  return (
    <Layout tabs={[
      { index: 0, label: 'Add New', to: '/inventory/add-new-inventory' },
      { index: 1, label: 'Add Vendor Purchase', to: '/inventory/add-vendor-purchase' },
      { index: 2, label: 'Stock', to: '/inventory/stock' },
    ]} />
  )
}

export default InventoryLayout