import React from 'react';
import BooksContext from '../context/BooksContext';

import { useCSVReader } from 'react-papaparse';


const styles = {
    csvReader: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    acceptedFile: {
        border: '1px solid #ccc',
        height: 45,
        lineHeight: 2.5,
        paddingLeft: 10,
        width: '50%',
    },

    progressBarBackgroundColor: {
        backgroundColor: 'red',
    },
};

export default function CSVReader() {
    const { CSVReader } = useCSVReader();
    const [csvList, setCsvList] = React.useState([])

    const { books, setBooks } = React.useContext(BooksContext);

    function handlePopulateData() {
        setBooks(csvList);
    }

    return (
        <div >
            <CSVReader
                config={{
                    header: true
                }}
                onUploadAccepted={(results) => {
                    console.log(results)
                    setCsvList(results.data)
                }}
            >
                {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                }) => (
                    <>
                        <div style={styles.csvReader}>
                            <button type='button' {...getRootProps()} className='btn btn-info'>
                                Browse file
                            </button>
                            <div style={styles.acceptedFile}>
                                {acceptedFile && acceptedFile.name}
                            </div>
                            {csvList.length > 0 && <button onClick={() => handlePopulateData()} className='btn btn-success ml-1'>
                                Add File Data
                            </button>}
                            {csvList.length > 0 && <button {...getRemoveFileProps()} onClick={() => {
                                setCsvList([])
                            }} className='btn btn-danger ml-1'>
                                Remove
                            </button>}
                        </div>
                        <ProgressBar style={styles.progressBarBackgroundColor} />
                    </>
                )}
            </CSVReader>
        </div>
    );
}