import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type PropsModal = {
  title:string,
  textButton:string,
  openModal:boolean,
  closeModal: () => void,
  deleteUser: () => void
}

function MyModal({title, textButton, openModal, closeModal, deleteUser}:PropsModal) {
  
  return (
    <>
      <Modal show={openModal} size="md" onClose={closeModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteUser}>
                {textButton}
              </Button>
              <Button color="gray" onClick={closeModal}>
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyModal