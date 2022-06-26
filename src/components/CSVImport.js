import React from 'react';
import BooksContext from '../context/BooksContext';
import { Badge } from 'react-bootstrap';

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

export default function CSVImport() {

    const { CSVReader } = useCSVReader();
    const [csvList, setCsvList] = React.useState([])
    const [columns, setColumns] = React.useState([])


    const { setBooks } = React.useContext(BooksContext);

    function handlePopulateData() {
        setBooks(csvList);
    }

    return (
        <div >
            <h5 className='text-center text-white'> <span className='text-danger'>*</span>Only CSV file supported</h5>
            <CSVReader
                config={{
                    header: true
                }}
                onUploadAccepted={(results) => {
                    const getColumns = Object.keys(results.data[0])
                    setColumns(getColumns)
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
                                Import File
                            </button>
                            <div style={styles.acceptedFile}>
                                {acceptedFile && acceptedFile.name}
                            </div>
                            {csvList.length > 0 && <button onClick={() => handlePopulateData()} className='btn btn-success ml-1'>
                                Add File Data
                            </button>}
                            {csvList.length > 0 && <button {...getRemoveFileProps()} onClick={() => {
                                setCsvList([])
                                setColumns([])

                            }} className='btn btn-danger ml-1'>
                                Remove
                            </button>}
                        </div>
                        <ProgressBar style={styles.progressBarBackgroundColor} />
                    </>
                )}
            </CSVReader>

            {csvList.length > 0 && <>
                <h5 className='text-white'> Total Row:{csvList.length}</h5>
            </>}
            {columns.length > 0 && <>
                <h5 className='text-white'> Columns Found :</h5>
                <div className='d-flex' alignItems='center' >
                    {columns.map((column, index) => {
                        return (
                            <Badge key={index} className='m-2 bg-success text-white p-2'>{column}</Badge>
                        )
                    })}
                </div>
            </>}
        </div>
    );
}
