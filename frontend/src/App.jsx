import { useEffect, useState } from 'react';
import { uploadDocument, getDocuments, deleteDocument, getDownloadUrl } from './services/api';
import './App.css';

// --- Icons Components ---
const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);
const FileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);

function App() {
    const [docs, setDocs] = useState([]);
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchDocs();
    }, []);

    const fetchDocs = async () => {
        try {
            const res = await getDocuments();
            setDocs(res.data);
        } catch (err) {
            console.error("Failed to fetch documents.");
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setStatus({ type: '', msg: '' });
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        try {
            await uploadDocument(file);
            setStatus({ type: 'success', msg: 'Document uploaded successfully!' });
            setFile(null);
            document.getElementById('fileInput').value = ''; 
            fetchDocs(); 
        } catch (err) {
            setStatus({ type: 'error', msg: 'Upload failed. Please ensure file is a PDF.' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        try {
            await deleteDocument(id);
            fetchDocs();
        } catch (err) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="app-container">
            <div className="main-content">
                <header className="header">
                    <h1>Patient Portal</h1>
                    <p>Secure Medical Document Management</p>
                </header>
                
                <div className="grid-layout">
                    {/* Upload Card */}
                    <div className="card upload-section">
                        <h2>Upload Document</h2>
                        <form onSubmit={handleUpload}>
                            <div className="file-drop-area">
                                <input 
                                    id="fileInput" 
                                    type="file" 
                                    accept="application/pdf" 
                                    onChange={handleFileChange} 
                                />
                                <div className="fake-btn">
                                    <UploadIcon />
                                    <span>{file ? file.name : "Choose PDF file"}</span>
                                </div>
                            </div>
                            
                            <button type="submit" className="primary-btn" disabled={!file || isUploading}>
                                {isUploading ? 'Uploading...' : 'Upload Securely'}
                            </button>
                        </form>
                        {status.msg && <div className={`status-badge ${status.type}`}>{status.msg}</div>}
                    </div>

                    {/* List Card */}
                    <div className="card list-section">
                        <div className="card-header">
                            <h2>Your Records</h2>
                            <span className="badge">{docs.length} Files</span>
                        </div>
                        
                        {docs.length === 0 ? (
                            <div className="empty-state">
                                <FileIcon />
                                <p>No documents uploaded yet.</p>
                            </div>
                        ) : (
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Document Name</th>
                                            <th>Size</th>
                                            <th>Uploaded</th>
                                            <th style={{textAlign: 'right'}}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {docs.map(doc => (
                                            <tr key={doc.id}>
                                                <td className="filename-cell">
                                                    <div className="file-icon-small"><FileIcon /></div>
                                                    {doc.filename}
                                                </td>
                                                <td>{(doc.size / 1024).toFixed(1)} KB</td>
                                                <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                                                <td className="actions-cell">
                                                    <a href={getDownloadUrl(doc.id)} className="icon-btn download" target="_blank" rel="noreferrer" title="Download">
                                                        <DownloadIcon />
                                                    </a>
                                                    <button onClick={() => handleDelete(doc.id)} className="icon-btn delete" title="Delete">
                                                        <TrashIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Added Here */}
                <footer className="footer">
                    Created by: Abhijeet Baloji (abhijeetmbaloji@gmail.com)
                </footer>
            </div>
        </div>
    );
}

export default App;