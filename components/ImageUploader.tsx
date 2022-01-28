import { useState } from "react";
import { auth, storage, STATE_CHANGED} from '../lib/firebase'
import Loader from "./Loader";

function ImageUploader() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgess] = useState(0);
    const [downloadURL, setDownLoadURL] = useState(null);

    return (
        <div className="box">
            <Loader show={uploading} />
            {uploading && <h3>{progress}</h3>}

            {!uploading && (
                <>
                    <label className="btn">
                        Upload Image
                        <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg"/>
                    </label>
                </>
            )}
        </div>
    );
}


export default ImageUploader;