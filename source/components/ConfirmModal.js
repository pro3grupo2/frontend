// DeleteConfirmModal.jsx
import React from 'react';

function ConfirmModal({ show, setShow, onConfirm }) {
    if (!show) return null;

    return (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="modal-content" style={{ backgroundColor: 'white', padding: 20, borderRadius: 5, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <h5>Confirmación</h5>
                <p>¿Estás seguro de que deseas eliminar este código?</p>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
                    <button onClick={onConfirm} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 5 }}>Eliminar</button>
                    <button onClick={() => setShow(false)} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: 5 }}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
