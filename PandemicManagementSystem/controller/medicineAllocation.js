var { Medical } = require('../model/model');
const bcrypt = require("bcrypt");


exports.medicineAllocation = async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    }

    try {
        const log = req.body.log;
        const lat = req.body.lat;
        const medicine = req.body.medicine;
        let count = req.body.count;

        let medicals = await Medical.find();

        
        const profile = "driving";
        
        let x = [];
        for (let ind = 0; ind < medicals.length; ind++) {
            // console.log(medicals[ind].medicine);
            for (let j = 0; j < medicals[ind].medicine.length; j++) {
                if (medicals[ind].medicine[j].name === medicine && medicals[ind].medicine[j].count > 0) {
                    const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${log},${lat};${medicals[ind].coordinate.longitude},${medicals[ind].coordinate.latitude}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
                    await fetch(apiUrl)
                        .then((response) => response.json())
                        .then((data) => {
                            const { duration } = data.routes[0];
                            x.push({ dur: duration / 60, ind: ind });
                        })
                        .catch((error) => console.error("Error:", error));
                    break;
                }
            }
        }
        x.sort((a, b) => {
            return a.dur - b.dur;
        });
        let ans = [];
        for (let i = 0; i < x.length && count; i++) {
            let dif = 0;
            for (let j = 0; j < medicals[x[i].ind].medicine.length; j++) {
                if (medicals[x[i].ind].medicine[j].name === medicine) {
                    if (Number(medicals[x[i].ind].medicine[j].count) >= Number(count)) {
                        medicals[x[i].ind].medicine[j].count -= Number(count);
                        dif = Number(count);
                        count = 0;
                    }
                    else {
                        count -= Number(medicals[x[i].ind].medicine[j].count);
                        dif = Number(medicals[x[i].ind].medicine[j].count);
                        medicals[x[i].ind].medicine[j].count = 0;
                    }
                    break;
                }
            }
            ans.push({
                medical: medicals[x[i].ind],
                count: dif,
            })

        }

        // for (let j = 0; j < x.length; j++) {
        //     await User.findByIdAndUpdate(medicals[x[i].ind]._id, medicals[x[i].ind], { useFindAndModify: false })
        //         .then(data => {
        //             if (!data) {
        //                 res.status(404).send({ message: `Cannot Update hosputal with id` });
        //             }
        //         })
        //         .catch(err => {
        //             res.status(500).send({ message: "Error Update user information" });
        //         })
        // }
        await res.status(200).json(ans);


    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.addMedical = async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Content cannot be empty!" });
        return;
      }
    
      const salt = bcrypt.genSaltSync(10);
      const hashPwd = bcrypt.hashSync(req.body.password, salt);
    
      // new lab
      const medical = new Medical({
        name: req.body.name,
        address: req.body.address,
        loginId: req.body.loginId,
        password: hashPwd,
        medicine: req.body.medicine,
        coordinate: {
          longitude: req.body.coordinate.longitude,
          latitude: req.body.coordinate.latitude,
        },
      });
    
      // save lab in the database
      medical
        .save(medical)
        .then((data) => {
          res
            .status(200)
            .json({ message: "New Medical added successfully!", data });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
}

