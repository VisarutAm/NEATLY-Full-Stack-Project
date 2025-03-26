import React from "react";

const DeletePopup = ({ isOpen, onClose, itemToDelete, onDeleteConfirm  }) => {
  
    const handleDeleteConfirm = () => {
        if (itemToDelete) {
          onDeleteConfirm(itemToDelete.id);
        }
      };
    


  if (!isOpen) return null;
  return (
    <div>
      <div className="fixed inset-0 flex justify-center items-center  z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-fit relative">
        <p className="p-5 font-bold">"Are you sure you want to cancel this booking?"</p>
          
        <hr className="m-2"></hr>
        <div className="flex justify-center gap-5 text-gray-200">
        <button className="bg-green-500 p-1 px-5 rounded-2xl"  onClick={handleDeleteConfirm}>Yes</button>  
        <button className="bg-red-600 p-1 px-5 rounded-2xl" onClick={onClose}>No</button> 
        </div> 
      </div>
      </div>
    </div>
  );
};

export default DeletePopup;
