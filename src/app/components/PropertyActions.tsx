import React, { useState } from 'react';

type Property = {
    id: string;
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    availability: boolean;
};

type PropertyActionsProps = {
    property: Property;
    onEdit: (property: Property) => void;
    onDelete: (propertyId: string) => void;
};

const PropertyActions = ({ property, onEdit, onDelete }: PropertyActionsProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                <i className="fas fa-ellipsis-v"></i> {/* Icon for more options */}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div style={{
                    position: 'absolute',
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    zIndex: 1,
                }}>
                    <button
                        onClick={() => {
                            onEdit(property);
                            setDropdownOpen(false);
                        }}
                        style={{
                            display: 'block',
                            padding: '10px',
                            width: '100%',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}>
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            onDelete(property.id);
                            setDropdownOpen(false);
                        }}
                        style={{
                            display: 'block',
                            padding: '10px',
                            width: '100%',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default PropertyActions;
