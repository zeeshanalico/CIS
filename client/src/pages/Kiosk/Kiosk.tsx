import { useState } from 'react'
import CreateKiosk from '@/components/form/CreateKiosk'
import KioskTable from './KioskTable'
const enum Tab {
  addNewKiosk,
  existedKiosks
}

const Kiosk = () => {
  const [tab, setTab] = useState<Tab>(Tab.addNewKiosk)
  const toggleTab = (tab: Tab) => {
    setTab(tab)
  }

  return (
    <div className=''>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-400 border-b border-gray-200 mb-3">
        <li className="me-1">
          <button onClick={() => toggleTab(Tab.addNewKiosk)} className={`inline-block p-2 rounded-t-lg  hover:bg-gray-100  ${tab == Tab.addNewKiosk ? 'text-indigo-600 bg-gray-100' : ''}`}>Add New Kiosk</button>
        </li>
        <li className="me-1">
          <button onClick={() => toggleTab(Tab.existedKiosks)} className={`inline-block p-2 rounded-t-lg hover:bg-gray-100 ${tab == Tab.existedKiosks ? 'text-indigo-600 bg-gray-100' : ''}`}>Existed Kiosks</button>
        </li>
      </ul>
      {tab === Tab.addNewKiosk ? <CreateKiosk /> : <KioskTable />}
    </div>
  )
}

export default Kiosk