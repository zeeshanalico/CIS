import Layout from "@/layout/Layout";

const VendorLayout = () => {
    const vendorTabs = [
        {index:0, label: 'Add Vendor', to: '/vendor/add-vendor' },
        // {index:1, label: 'Add Vendor Purchase', to: '/vendor/add-purchase' }
    ];
    
    return <Layout tabs={vendorTabs} />;
};
export default VendorLayout