import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { connect, socket } from "../socket";
import { useSelector } from "react-redux";
import axios from "axios";
import getToken from "../utils/getToken";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
// import credentials from "../credentials";

const geo = navigator.geolocation;

const Maps = () => {
  const { loggedUser } = useSelector((state) => state.user);

  useEffect(() => {
    const loader = new Loader({
      // apiKey: credentials.apiKey,
      apiKey: "",
      version: "weekly",
    });

    loader.load().then((google) => {
      console.log("API LOADED");

      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.87082885485712, lng: -65.09152154527119 },
        zoom: 8,
      });

      if (loggedUser.role == "ecommerce") {
        const infowindow = new google.maps.InfoWindow({
          content: "",
        });

        let markers = [];
        socket.on("new-coords", (cadetesCoords) => {
          console.log("NEW COORDS", cadetesCoords);
          markers.forEach((m) => m.setMap(null));
          markers.length = 0;

          cadetesCoords.forEach(({ coords, fullName }) => {
            const marker = new google.maps.Marker({
              position: coords,
              map: map,
              icon: "http://maps.google.com/mapfiles/kml/shapes/motorcycling.png",
            });

            markers.push(marker);

            marker.addListener("click", () => {
              infowindow.setContent(fullName);
              infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
              });
              console.log("USER", fullName);
            });
          });
        });

        socket.emit("get-coords");
      } else {
        (async () => {
          const ds = new google.maps.DirectionsService();
          const dr = new google.maps.DirectionsRenderer();
          dr.setMap(map);

          const res = await axios.post(
            `/api/order/myorders/${loggedUser._id}`,
            {},
            getToken()
          );
          console.log("MIS ORDENES", res.data);

          const wayPoints = [];

          res.data.forEach((o) => {
            if (o.actualState == "En Camino") {
              // if (true) {
              const ads = o.client.address;
              wayPoints.push({
                location: `${ads.street} ${ads.numberStreet}, ${ads.city}, ${ads.province}, Argentina`,
                stopover: true,
              });
            }
          });
          console.log("WAYPOINTS", wayPoints);

          const { data } = await axios.get(
            `/api/courier/${loggedUser.courierId}`,
            getToken()
          );

          console.log("COURIER", data);
          const start = data.address;
          const geocoder = new google.maps.Geocoder();

          geocoder.geocode({ address: start }, function (results, status) {
            if (status == "OK") {
              const cadeteriaDirection = results[0].geometry.location;
              console.log("CADETERIA DIRECTION", cadeteriaDirection.toJSON());
              // setTimeout(() => {
              map.setCenter(cadeteriaDirection);
              // }, 1000);

              new google.maps.Marker({
                map: map,
                position: cadeteriaDirection,
                icon: "http://maps.google.com/mapfiles/kml/shapes/ranger_station.png",
              });

              geo.getCurrentPosition(({ coords }) => {
                const MyCoords = {
                  lat: coords.latitude,
                  lng: coords.longitude,
                };

                const m = new google.maps.Marker({
                  position: MyCoords,
                  map: map,
                  icon: "http://maps.google.com/mapfiles/kml/shapes/motorcycling.png",
                });

                // new google.maps.Marker({
                //   position: start,
                //   map: map,
                // });

                const request = {
                  origin: cadeteriaDirection,
                  // origin: MyCoords,
                  destination: cadeteriaDirection,
                  travelMode: "DRIVING",
                  waypoints: wayPoints,
                  optimizeWaypoints: true,
                };

                ds.route(request, function (result, status) {
                  console.log("RUTA PARA ENTREGAR LAS ORDENES", result);
                  socket.emit("test", result);
                  if (status == "OK") {
                    dr.setDirections(result);

                    socket.on("my-coords", (coords) => {
                      console.log("NEWW", coords);
                      m.setPosition(coords);
                      // map.setCenter(coords);
                    });

                    // ref.current = () => {
                    //   console.log("CUREEEEEEEEEE");
                    //   m.setPosition(cadeteriaDirection);
                    // };

                    // const path = result.routes[0].overview_path;
                    // let start = path[0].toJSON();
                    // let end = path[1].toJSON();
                    // let actual = { ...start };
                    // let idx = 1;
                    // setInterval(() => {
                    //   actual.lat -= (start.lat - end.lat) * 0.08;
                    //   actual.lng -= (start.lng - end.lng) * 0.08;
                    //   m.setPosition(actual);

                    //   if (actual.lat <= end.lat && actual.lng <= end.lng) {
                    //     console.log("ENDDDDDDDDDDDDDDD");
                    //     start = path[idx].toJSON();
                    //     end = path[idx + 1].toJSON();
                    //     idx++;
                    //   }
                    //   socket.emit("new-coords", actual);
                    // }, 1000);
                  }
                });
              });
            } else {
              console.error(
                "Geocode was not successful for the following reason: " + status
              );
            }
          });
        })();
      }
    });
  }, []);

  return (
    <div>
      <h1>MAPAS</h1>
      <div id="map" style={{ height: "500px" }}></div>
    </div>
  );
};

export default Maps;

// useEffect(() => {
//   console.log("EFFECTO");
//   const geo = navigator.geolocation;
//   geo.watchPosition((pos) => {
//     console.log("POSITION", pos);
//   });
// }, []);
