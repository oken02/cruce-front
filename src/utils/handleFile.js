import XLSX from 'xlsx'

const handleFile = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
  
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
  
        const wb = XLSX.read(bufferArray, { type: "buffer" });
  
        console.log("WBB", wb);
  
        const wsname = wb.SheetNames[0];
  
        const ws = wb.Sheets[wsname];
  
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  export default handleFile;