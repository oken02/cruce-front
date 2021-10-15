const router = require('express').Router()
const {allMetricsInOneYear, allMetricsInOnMonth, courierMetricInOneYear, courierMetricInOnMonth, messengerMetricInOneYear, messengerMetricInOneMonth} = require('../controllers/metricController')


//trae TODAS las TABLAS metricas de TODOS los couriers en un AÑO especifico
router.post("/", allMetricsInOneYear)

//Trae todas las metricas de un mes determinado
router.post("/allordersinonemonth", allMetricsInOnMonth)

//Trae UNA tabla metrica de UN COURIER en un AÑO especifico
router.post("/courieryear", courierMetricInOneYear)

//Trae pedidos en UN mes de Mensajeria
router.post("/couriermonth" , courierMetricInOnMonth)

//Trae las metricas del Cadete del año actual o las de un año en particular si se lo pasa por Body
router.post("/messegeryear", messengerMetricInOneYear)

//Trae las metricas del cadete en un mes del año actual
router.post("/messengermonth" , messengerMetricInOneMonth)









module.exports = router