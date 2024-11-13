import React, { useState } from 'react';
import AddPrisonerForm from './AddingPrisoner/AddPrisonerForm';

interface SearchAndActionButtonsProps {
    selectedTab: 'prisoners' | 'police' | 'guards';
    filterVisible: boolean;
    setFilterVisible: (visible: boolean) => void;
}

const SearchAndActionButtons: React.FC<SearchAndActionButtonsProps> = ({ selectedTab, filterVisible, setFilterVisible }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const searchPlaceholders = {
        prisoners: "Search prisoner",
        police: "Search police officer",
        guards: "Search guard"
    };

    const createNewLabels = {
        prisoners: "Create New Prisoner",
        police: "Create New Police Officer",
        guards: "Create New Guard"
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handlePrisonerSubmit = async (prisonerData: any) => {
        try {
            await fetch('/api/v1/prisoner/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prisonerData)
            });
            alert("Prisoner created successfully!");
        } catch (error) {
            console.error("Error creating prisoner:", error);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder={searchPlaceholders[selectedTab]}
                className="border border-gray-300 rounded-md px-4 py-2"
            />

            {/* Create New Button */}
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={openModal}
            >
                {createNewLabels[selectedTab]}
            </button>

            {/* Filter Button */}
            <button
                className="bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={() => setFilterVisible(!filterVisible)}
            >
                Filter
            </button>

            {/* Modal for Adding New Prisoner */}
            <AddPrisonerForm isOpen={isModalOpen} onClose={closeModal} onSubmit={handlePrisonerSubmit} />
        </div>
    );
};

export default SearchAndActionButtons;