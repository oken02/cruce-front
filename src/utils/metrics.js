

const calculateDelivered = (arr) => {
    let total = arr.filter(order => order.actualState === "Entregado");
 return total.length       
}

const deliveredAvg = (arr) => {
    let total = arr.filter(order => order.actualState === "Entregado");
 let average = (total.length / arr.length ) * 100
    return average
}

const calculateNotAsign = (arr) => {
    let total = arr.filter(order => order.actualState === "Sin Asignar");
 return total.length       
}


const notAsignAvg = (arr) => {
    let total = arr.filter(order => order.actualState === "Sin Asignar");
 let average = (total.length / arr.length ) * 100
    return average
}

const calculateOnItsWay = (arr) => {
    let total = arr.filter(order => order.actualState === "En Camino");
 return total.length       
}

const onItsWayAvg = (arr) => {
    let total = arr.filter(order => order.actualState === "En Camino");
    let average = (total.length / arr.length) * 100
    return average
}

const calculatePendings = (arr) => {
    let total = arr.filter(order => order.actualState === "Pendiente de Retiro en Sucursal");
 return total.length       
}
const pendingsAvg = (arr) => {
    let total = arr.filter(order => order.actualState === "Pendiente de Retiro en Sucursal");
    let average = (total.length / arr.length) * 100
    return average
}


const calculateReturned = (arr) => {
    let total = arr.filter(order => order.actualState === "Devuelto a Sucursal");
 return total.length       
}
const returnedAvg = (arr) => {
    let total = arr.filter(order => order.actualState === "Devuelto a Sucursal");
    let average = (total.length / arr.length) * 100
    return average
}


export { calculateDelivered, deliveredAvg, calculateNotAsign, notAsignAvg, calculateOnItsWay, onItsWayAvg, calculatePendings, pendingsAvg, calculateReturned,returnedAvg }