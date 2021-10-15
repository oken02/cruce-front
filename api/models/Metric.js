const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderMetricSchema = new Schema({
  userId : {
    type : Schema.Types.ObjectId,
    ref : "User"
  },
  fullName : String,
  date : Date,
  state : String, 
  totalTimeToDelivery : Number,
})


const monthSchema = new Schema({
  0 : [orderMetricSchema],
  1 : [orderMetricSchema],
  2 : [orderMetricSchema],
  3 : [orderMetricSchema],
  4 : [orderMetricSchema],
  5 : [orderMetricSchema],
  6 : [orderMetricSchema],
  7 : [orderMetricSchema],
  8 : [orderMetricSchema],
  9 : [orderMetricSchema],
  10 : [orderMetricSchema],
  11 : [orderMetricSchema],
})


const metricSchema = new Schema({
  courierId : {
    type : Schema.Types.ObjectId,
    ref : "Courier"
  },
  year : Number,
  month : monthSchema
})

// new Metric.month[9]




const Metric = mongoose.model("Metric", metricSchema);


module.exports = Metric;



/* {"metrics.month.0.userId" : "id"} */

/* const prueba = async(req, res , next) => {
  //const id = req.body.id;
  try {
      const dato = await Order.find({
          //orderId : id,
          "stateHistory.state" : "Devuelto a Sucursal"  
      })
      res.send(dato)
  } catch (err) { next(err) }
} */


/* 
{
  courierId : id
  year : "2021"
  metrics : {
    0 : 0 : {
      envio1
    },
    1 : {
      envio2
    }
  }}
*/


/*
cad 1
cad 2
cad 3
cad 4

HISTORIAL{

    21 : {
        1 : {
              1 : {
                  DATE : 01/01/2021,
                  STATE : "ENTREGADO",
                  TIEMPO DE ENTREGA : 90MIN,
            }
        }
    }
}


{2021 : "algo"}
obj["2021"]


order  find( courierId : courierId )
TODOSLOSPEDIDOS DEUNACADETERIA


metrica global
variableOrdenesMensajeria : 1000
.map(element => element.statehistory <fecha >fecha)
variable1 = objetoglobal -> ENERO/21


const orderSchema = new Schema({
    userId : {
      type : Schema.Types.ObjectId,
      ref : "User"
    },
    date : Date,
    status : String,
    totalTimeInMinutes : Number
  })
  
  const yearSchema = new Schema({
    enero : [orderSchema],
  })
  
  const historySchema = new Schema({
    year : [yearSchema]
  })
  
  
  {
     2021 : 
    { ENERO : 
      {
        userId : cadete,
        date : new Date(),
        status : entregado || devuelto,
        totalTime : 90 min 
      }
    }
  }
  
  
  PARA MENSAJERÍA
  % del total de pedidos (cuantos pedidos saca cada cadete del total) -
  tiempo que le lleva el pedido en % -
  efectividad de entrega -
  
  PARA ECOMMERCE
  % del total de pedidos de cada cadetería 
  tiempo % que le lleva realizarlo
  efectividad de entrega
  
  PARA EL CADETE
  tiempo que le lleva el pedido en % -
  efectividad de entrega -
  
  
  
  cadete1 : {60%, 70min,  90%}
  cadete2 : {40%, 85 min, 94%}
  
  
  post.save 
  entregado || devuelto
  const tiempo = new Date()
  const tiempoModeladoAño = new Date (tiempo).getFullYear (2021)
  const tiempoModeladoMes = new Date (tiempo).getMonth (0 - 11)
    con la logica correspondiente
  postear dentro de los parametros (año - mes)

  
  --------------
  const metricSchema = new Schema({
    courierId : {
      type : Schema.Types.ObjectId,
      ref : "Courier"
    },
    year : 
  })

  metrics

  {
      2021 : [{
          ENERO : {
                 [{
                    userId : cadete,
                    date : new Date(),
                    status : entregado || devuelto,
                    totalTime : 90 min 
                }],
           FEBRERO : {
                 [{
                    userId : cadete,
                    date : new Date(),
                    status : entregado || devuelto,
                    totalTime : 90 min 
                }],
           MARZO : {
                 [{
                    userId : cadete,
                    date : new Date(),
                    status : entregado || devuelto,
                    totalTime : 90 min 
                }]          
          }]
      }
  }

metrics.find({
    courierId: objId
    year : 2021,
    month : ["enero" : {
        userId : Id
    }]
})
100.000 / cant courier 25000
25000 /12 = 2085 
2085 / 5 = 400
-------
userId
state
tiempoPromedio
date()



schema 
courierId : obj Id
year : "2021",
month : [
    enero : [{

    }]
]


Order.find({
    Order : Id,
    client : {
        firstName : "Ezequiel"
    }
})
   */
  