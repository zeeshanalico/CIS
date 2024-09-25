import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import React from 'react'
import CreateCustomer from "../Customer/CreateCustomer/CreateCustomer";
const CreateCustomerModal = ({ isOpen, toggleModal, name, }: { name: string; isOpen: boolean, toggleModal: () => void }) => {
    return (
        <Modal title="Create Customer" className="z-[999]" isOpen={isOpen} >
            <CreateCustomer
                toggleModal={toggleModal}
                name={name}
                onClose={toggleModal}
            />
        </Modal>
    )
}

export default CreateCustomerModal