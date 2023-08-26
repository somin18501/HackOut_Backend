var { User, hospital } = require('../model/model');

exports.hostpitalAllocation = async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    }

    try {
        let rCount = req.body.rCount;
        let gCount = req.body.gCount;
        let yCount = req.body.yCount;

        const log = req.body.log;
        const lat = req.body.lat;

        const hospitals = await hospital.find();

        const profile = "driving";

        let ans = new Map();

        for (let i = 30; rCount || yCount || gCount; i += 15) {
            // console.log(rCount, yCount, gCount);
            let x = [];
            for (let ind = 0; ind < hospitals.length; ind++) {
                if (hospitals[ind].capacity - hospitals[ind].count.patient < 1) {
                    continue;
                }
                const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${log},${lat};${hospitals[ind].coordinate.longitude},${hospitals[ind].coordinate.latitude}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
                await fetch(apiUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        const { duration } = data.routes[0];
                        if (duration / 60 <= i) {
                            x.push({ dur: duration / 60, ind: ind });
                        }
                    })
                    .catch((error) => console.error("Error:", error));
            }
            x.sort((a, b) => {
                return a.dur - b.dur;
            });
            for (let j = 0; j < x.length && rCount; j++) {
                const dif = Number(hospitals[x[j].ind].capacity - hospitals[x[j].ind].count.patient);
                let tm = 0;
                if (rCount > dif) {
                    rCount -= dif;
                    tm = dif;
                    hospitals[x[j].ind].count.patient = hospitals[x[j].ind].capacity;
                }
                else {
                    // hospitals[x[j].ind].count.patient += ( hospitals[x[j].ind].capacity - rCount);
                    hospitals[x[j].ind].count.patient += Number(rCount);
                    tm = Number(rCount);
                    rCount = 0;
                }
                const ob = {
                    id: hospitals[x[j].ind]._id,
                    name: hospitals[x[j].ind].name,
                    address: hospitals[x[j].ind].address,
                    color: 'red'
                }
                if (ans.get(ob)) {
                    tm += ans.get(ob);
                }
                if(tm)
                    ans.set(ob, tm);


            }

            for (let j = 0; j < x.length && !rCount && yCount; j++) {
                const dif = Number(hospitals[x[j].ind].capacity - hospitals[x[j].ind].count.patient);
                let tm = 0;
                if (yCount > dif) {
                    yCount -= dif;
                    tm = dif;
                    hospitals[x[j].ind].count.patient = hospitals[x[j].ind].capacity;
                }
                else {
                    // hospitals[x[j].ind].count.patient += ( hospitals[x[j].ind].capacity - yCount);\
                    hospitals[x[j].ind].count.patient += Number(yCount);
                    tm = Number(yCount);
                    yCount = 0;
                }
                if (ans.get(hospitals[x[j].ind])) {
                    tm += ans.get(hospitals[x[j].ind]);
                }
                const ob = {
                    id: hospitals[x[j].ind]._id,
                    name: hospitals[x[j].ind].name,
                    address: hospitals[x[j].ind].address,
                    color: 'yellow'
                }
                if (ans.get(ob)) {
                    tm += ans.get(ob);
                }
                if(tm)
                    ans.set(ob, tm);
            }

            for (let j = 0; j < x.length && !rCount && !yCount && gCount; j++) {
                const dif = Number(hospitals[x[j].ind].capacity - hospitals[x[j].ind].count.patient);
                let tm = 0;

                if (gCount > dif) {
                    gCount -= dif;
                    tm = dif;
                    hospitals[x[j].ind].count.patient = hospitals[x[j].ind].capacity;
                }
                else {
                    // hospitals[x[j].ind].count.patient += ( hospitals[x[j].ind].capacity - gCount);
                    hospitals[x[j].ind].count.patient += Number(gCount);
                    tm = Number(gCount);
                    gCount = 0;
                }
                if (ans.get(hospitals[x[j].ind])) {
                    tm += ans.get(hospitals[x[j].ind]);
                }
                const ob = {
                    id: hospitals[x[j].ind]._id,
                    name: hospitals[x[j].ind].name,
                    address: hospitals[x[j].ind].address,
                    color: 'green'
                }
                if (ans.get(ob)) {
                    tm += ans.get(ob);
                }
                if(tm)
                    ans.set(ob, tm);
            }

            // for (let j = 0; j < x.length; j++) {
            //     await User.findByIdAndUpdate(hospitals[x[i].ind]._id, hospitals[x[i].ind], { useFindAndModify: false })
            //         .then(data => {
            //             if (!data) {
            //                 res.status(404).send({ message: `Cannot Update hosputal with id` });
            //             }
            //         })
            //         .catch(err => {
            //             res.status(500).send({ message: "Error Update user information" });
            //         })
            // }

        }
        const fun = [];
        await ans.forEach(async (k,v)=>{
            await fun.push({data: v,count: k});
        })
        console.log(fun);
        await res.status(200).json(fun);


    } catch (err) {
        res.status(500).send(err);
    }
}