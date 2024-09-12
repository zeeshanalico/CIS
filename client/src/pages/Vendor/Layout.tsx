import Layout from "@/layout/Layout";

const VendorLayout = () => {
    const vendorTabs = [
        { label: 'Add Vendor', to: '/vendor/add-vendor' },
        { label: 'Add Vendor Purchase', to: '/vendor/add-purchase' }
    ];
    
    return <Layout tabs={vendorTabs} />;
};
export default VendorLayout