const { Metric } = require("../models")

const elCasiHook = async (state, obj, courierId, userId) => {

        const fechaMetrica = new Date(obj.date)
        const year = fechaMetrica.getFullYear()
        const objMonth = fechaMetrica.getMonth()
        const fechaMetricaMili = fechaMetrica.getTime()

        const fechaActual = new Date()
        const fechaActualMili = fechaActual.getTime()

        const tiempoEnMinutos = Math.floor((fechaActualMili - fechaMetricaMili) / 60000)

        const objMetric = {
            userId : userId,
            date : fechaActual,
            state : state,
            totalTimeToDelivery : tiempoEnMinutos
        }

        const metricas = await Metric.find({ courierId : courierId, year : year}) 
        if(metricas.length){
            metricas[0].month[`${objMonth}`] = [...metricas[0].month[`${objMonth}`], objMetric]
            await metricas[0].save()
            
        }else{
            const metric = new Metric({
                courierId : courierId,
                year : year,
                month : {
                    [objMonth] : objMetric
                }
            })

            await metric.save()
            
        }
    }

module.exports = {elCasiHook}