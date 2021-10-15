const { Metric, Courier, Order, OrderMetric } = require("../models");

//Trae todas las tablas de metricas de este año || puede enviarse por body el año
const allMetricsInOneYear = async (req, res, next) => {
  const { anio } = req.body; //preferiblemente OMITIRLO 

  let year;
  if (anio) {
    year = anio;
  } else {
    let thisDay = new Date();
    year = thisDay.getFullYear();
  }
  try {
    const metrics = await Metric.find({
      year: year,
    }).populate("courierId");
    res.status(200).send(metrics);
  } catch (err) {
    next(err);
  }
};

const allMetricsInOnMonth = async (req, res, next) => {
    const { mes } = req.body

    try{
        let thisDay = new Date()
        let year = thisDay.getFullYear()

        const metrics = await Metric.find({
            year : year
        })


        let metricas = JSON.stringify(metrics)
        metricas = JSON.parse(metricas)
        
        const filter = (obj, mes) => {
            const arr = [];
              for (const tabla of obj) {
                if (tabla.month[mes].length) {
                  arr.push(tabla.month[mes]);
                }
              }
            
            return arr;
          };
        let datos = filter(metricas, mes)
        datos = datos.flat()
        console.log(datos)
      
        res.send(datos)

    } catch(err) {
        next(err)
    }
}

const courierMetricInOneYear = async (req, res, next) => {
  const { anio, courierName } = req.body;

  let year;
  if (anio) {
    year = anio;
  } else {
    let thisDay = new Date();
    year = thisDay.getFullYear();
  }

  const courierId = await Courier.find({ name: courierName });

  try {
    const metrics = await Metric.find({
      courierId: courierId,
      year: year,
    }).populate("courierId");
    res.status(200).send(metrics[0].month);
  } catch (err) {
    next(err);
  }
};

const courierMetricInOnMonth = async(req, res, next) => {
    const { mes , courierName} = req.body
    const {courierId} = req.payload
    

    try{
        let courier
        if(courierName){
            courier = await Courier.find({
                name : courierName
            })
        } else {
            courier = courierId
        }
        

        const metrics = await Metric.find({
            courierId : courier,
            year : "2021"
        })

        let metricas = JSON.stringify(metrics)
        metricas = JSON.parse(metricas)
        let datos = metricas[0].month[mes]

        res.send(datos)

    }catch(err){
        next (err)
    }
}

//

const messengerMetricInOneYear = async (req, res, next) => {
  try {
    const { anio } = req.body; //NO PASARLO 
    const { id, courierId } = req.payload;

    let year;
    if (anio) {
      year = anio;
    } else {
      let thisDay = new Date();
      year = thisDay.getFullYear();
    }
    const metrics = await Metric.find({
      courierId: courierId,
      year: year,
    });

    let metricasA = metrics[0].month;

    metricasA = JSON.stringify(metricasA);
    metricasA = JSON.parse(metricasA);

    const filter = (mes, userId) => {

      const arr = [];

      for (const key in mes) {
        for (const pedido of mes[key]) {
          if (pedido.userId == userId) {
            arr.push(pedido);
          }
        }
      }
      return arr;
    };
    const rta = filter(metricasA, id);

    res.send(rta);
  } catch (err) {
    next(err);
  }
};

const messengerMetricInOneMonth = async (req, res, next) => {
  const { mes } = req.body;
  const { id, courierId } = req.payload;
  try {
    
    let thisDay = new Date();
    let year = thisDay.getFullYear();
    
    const metrics = await Metric.find({
      courierId: courierId,
      year: year,
    });

    let metricas = JSON.stringify(metrics)
    metricas = JSON.parse(metricas)
    let datos = metricas[0].month[mes]
    

    const filter = (obj, userId) => {
        const arr = [];
          for (const pedido of obj) {
            if (pedido.userId == userId) {
              arr.push(pedido);
            }
          }
        
        return arr;
      };
      const rta = filter(datos,id)

    res.send(rta)

  } catch (err) {
    next(err);
  }
};



module.exports = {
  allMetricsInOneYear,
  allMetricsInOnMonth,
  courierMetricInOneYear,
  courierMetricInOnMonth,
  messengerMetricInOneYear,
  messengerMetricInOneMonth,
  
};
