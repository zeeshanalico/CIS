import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { FormikType } from './AddVendorPurchase';
import { useGetAllVendorsQuery } from '@/store/slices/vendorSlice/vendorApiSlice';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

interface VendorOption {
  value: number;
  label: string;
  contact_info: string; // additional field
}

const validationSchema = yup.object({
  vendor_name: yup.string().required('Vendor name is required'),
  vendor_contact_info: yup.string().required('Vendor contact info is required'),
});

const SelectVendor = ({ formik }: { formik: FormikType }) => {
  const { data: vendorsResponse } = useGetAllVendorsQuery({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [options, setOptions] = useState<VendorOption[]>(
    vendorsResponse?.result?.map((vendor:any) => ({
      value: vendor.id,
      label: vendor.name,
      contact_info: vendor.contact_info,
    })) || []
  );

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleCreateVendor = (newVendor: VendorOption) => {
    const newOptions = [...options, newVendor];
    setOptions(newOptions);
    formik.setFieldValue('vendorId', newVendor.value);
  };

  return (
    <>
      <CreatableSelect
        className="basic-single"
        classNamePrefix="select"
        defaultValue={formik.values.vendorId}
        isSearchable
        options={options.map((vendor) => ({
          value: vendor.value,
          label: vendor.label,
        }))}
        onChange={(value) => formik.setFieldValue('vendorId', value?.value)}
        onCreateOption={toggleModal} // Trigger modal when "Create New Vendor" is selected
        placeholder="Select or Create Vendor"
      />

      {/* Modal to create a new vendor */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <Formik
          initialValues={{
            vendor_name: '',
            vendor_contact_info: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const newVendor = {
              value: Date.now(), // Generate a unique ID
              label: values.vendor_name,
              contact_info: values.vendor_contact_info,
            };
            handleCreateVendor(newVendor); // Add vendor to the options
            resetForm();
            toggleModal();
          }}
        >
          {({ errors, touched }) => (
            <Form className="p-4">
              <div>
                <label>Vendor Name</label>
                <Field name="vendor_name" className="input" />
                {errors.vendor_name && touched.vendor_name && <div>{errors.vendor_name}</div>}
              </div>

              <div>
                <label>Contact Info</label>
                <Field name="vendor_contact_info" className="input" />
                {errors.vendor_contact_info && touched.vendor_contact_info && <div>{errors.vendor_contact_info}</div>}
              </div>

              <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
                Add Vendor
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default SelectVendor;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="z-44 bg-white p-4 rounded shadow-lg">
        {children}
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

