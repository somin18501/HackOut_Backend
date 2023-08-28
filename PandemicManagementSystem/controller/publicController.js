var { hospital } = require('../model/model');
const fetch = require("node-fetch");

exports.nearHospitals = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    try {
        const log = req.body.log;
        const lat = req.body.lat;

        const hospitals = await hospital.find();

        const profile = "driving";

        let x = [];

        for (let i = 0; i < hospitals.length; i++) {
            const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${log},${lat};${hospitals[i].coordinate.longitude},${hospitals[i].coordinate.latitude}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
            await fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const { duration, distance } = data.routes[0];
                    x.push({ dur: duration, dist: distance, ind: i });
                })
                .catch((error) => console.error("Error:", error));
        }

        x.sort((a, b) => {
            return a.dur - b.dur;
        });

        ans = []
        for (let i = 0; i < x.length && i < 5; i++) {
            ans.push({ hospital: hospitals[x[i].ind], distance: x[i].dist, duration: x[i].dur });
        }

        res.status(200).json({ data: ans });

    }
    catch (err) {
        res.status(500).send(err);
    }
};