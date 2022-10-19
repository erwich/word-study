import React, { useState } from "react"

const Modal = ({
  buttonClass,
  buttonText,
  children,
  confirmText,
  cancelText,
  onConfirm,
  title,
}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        className={buttonClass}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {buttonText}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-slate-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold dark:text-slate-100">
                    {title}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative px-5 flex-auto">{children}</div>
                {/*footer*/}
                <div className="flex items-center justify-end py-6 px-5 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    {cancelText || "Cancel"}
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      onConfirm && onConfirm()
                      setShowModal(false)}
                    }
                  >
                    {confirmText || "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default Modal
