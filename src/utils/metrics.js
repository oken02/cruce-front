// Calculo de entregados
const calculateDelivered = (arr) => {
  let total = arr.filter((order) => order.actualState === 'Entregado');
  return total.length;
};

const deliveredAvg = (arr) => {
  let total = arr.filter((order) => order.actualState === 'Entregado');
  let average = (total.length / arr.length) * 100;
  return average;
};

// Calculo de Sin asignar
const calculateNotAsign = (arr) => {
  let total = arr.filter((order) => order.actualState === 'Sin Asignar');
  return total.length;
};

const notAsignAvg = (arr) => {
  let total = arr.filter((order) => order.actualState === 'Sin Asignar');
  let average = (total.length / arr.length) * 100;
  return average;
};

// Calculo de En Camino
const calculateOnItsWay = (arr) => {
  let total = arr.filter((order) => order.actualState === 'En Camino');
  return total.length;
};

const onItsWayAvg = (arr) => {
  let total = arr.filter((order) => order.actualState === 'En Camino');
  let average = (total.length / arr.length) * 100;
  return average;
};

// Calculo de Pendientes
const calculatePendings = (arr) => {
  let total = arr.filter(
    (order) => order.actualState === 'Pendiente de Retiro en Sucursal'
  );
  return total.length;
};
const pendingsAvg = (arr) => {
  let total = arr.filter(
    (order) => order.actualState === 'Pendiente de Retiro en Sucursal'
  );
  let average = (total.length / arr.length) * 100;
  return average;
};

// Calculo de Devueltos
const calculateReturned = (arr) => {
  let total = arr.filter(
    (order) => order.actualState === 'Devuelto a Sucursal'
  );
  return total.length;
};

const returnedAvg = (arr) => {
  let total = arr.filter(
    (order) => order.actualState === 'Devuelto a Sucursal'
  );
  let average = (total.length / arr.length) * 100;
  return average;
};

// Calculo Cant de Mensajerias
const countCouriers = (arr) => {
  arr.reduce(function (obj, courier) {
    if (!obj[courier]) {
      obj[courier] = 1;
    } else {
      obj[courier]++;
    }
    return obj;
  }, {});

  // let repetidos = {};
  // arr.forEach((element) => {
  //   repetidos[element] = ((repetidos[element] || 0) + 1);
  // });
  // console.log('REP --> ', repetidos);

  //     arr.reduce((acc, element) => {
  //     acc[element.courierId] = ++acc[element.courierId] || 0;
  //     return acc;
  //   }, {});

  // let duplicates = arr.filter((element) => {
  //   return search[element.courierId];
  // });
};

export {
  calculateDelivered,
  deliveredAvg,
  calculateNotAsign,
  notAsignAvg,
  calculateOnItsWay,
  onItsWayAvg,
  calculatePendings,
  pendingsAvg,
  calculateReturned,
  returnedAvg,
  countCouriers,
};
