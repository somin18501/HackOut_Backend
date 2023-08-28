const { Lab } = require("../model/model");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");

exports.labsAllocation = async (req, res) => {
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

    const labs = await Lab.find();

    const profile = "driving";

    let ans = new Map();

    for (let i = 30; rCount || yCount || gCount; i += 15) {
      // console.log(rCount, yCount, gCount);
      let x = [];
      for (let ind = 0; ind < labs.length; ind++) {
        const total =
          labs[ind].cntSample.red +
          labs[ind].cntSample.yellow +
          labs[ind].cntSample.green;
        if (labs[ind].capacity - total < 1) {
          continue;
        }
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${log},${lat};${labs[ind].coordinate.longitude},${labs[ind].coordinate.latitude}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
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
        const total =
          labs[x[j].ind].cntSample.red +
          labs[x[j].ind].cntSample.yellow +
          labs[x[j].ind].cntSample.green;
        const dif = Number(labs[x[j].ind].capacity - total);
        let tm = 0;
        if (rCount > dif) {
          rCount -= dif;
          tm = dif;
          labs[x[j].ind].cntSample.red += dif;
        } else {
          // labs[x[j].ind].count.patient += ( labs[x[j].ind].capacity - rCount);
          labs[x[j].ind].cntSample.red += Number(rCount);
          tm = Number(rCount);
          rCount = 0;
        }
        const ob = {
          id: labs[x[j].ind]._id,
          name: labs[x[j].ind].name,
          address: labs[x[j].ind].address,
          color: 'red'
        }
        if (ans.get(ob)) {
          tm += ans.get(ob);
        }
        if (tm)
          ans.set(ob, tm);
      }

      for (let j = 0; j < x.length && !rCount && yCount; j++) {
        const total =
          labs[x[j].ind].cntSample.red +
          labs[x[j].ind].cntSample.yellow +
          labs[x[j].ind].cntSample.green;
        const dif = Number(labs[x[j].ind].capacity - total);
        let tm = 0;
        if (yCount > dif) {
          yCount -= dif;
          tm = dif;
          labs[x[j].ind].cntSample.yellow += dif;
        } else {
          // labs[x[j].ind].count.patient += ( labs[x[j].ind].capacity - yCount);\
          labs[x[j].ind].cntSample.yellow += Number(yCount);
          tm = Number(yCount);
          yCount = 0;
        }
        const ob = {
          id: labs[x[j].ind]._id,
          name: labs[x[j].ind].name,
          address: labs[x[j].ind].address,
          color: 'red'
        }
        if (ans.get(ob)) {
          tm += ans.get(ob);
        }
        if (tm)
          ans.set(ob, tm);
      }

      for (let j = 0; j < x.length && !rCount && !yCount && gCount; j++) {
        const total =
          labs[x[j].ind].cntSample.red +
          labs[x[j].ind].cntSample.yellow +
          labs[x[j].ind].cntSample.green;
        const dif = Number(labs[x[j].ind].capacity - total);
        let tm = 0;
        if (gCount > dif) {
          gCount -= dif;
          tm = dif;
          labs[x[j].ind].cntSample.green += dif;
        } else {
          // labs[x[j].ind].count.patient += ( labs[x[j].ind].capacity - gCount);
          labs[x[j].ind].cntSample.green += Number(gCount);
          tm = Number(gCount);
          gCount = 0;
        }
        const ob = {
          id: labs[x[j].ind]._id,
          name: labs[x[j].ind].name,
          address: labs[x[j].ind].address,
          color: 'red'
        }
        if (ans.get(ob)) {
          tm += ans.get(ob);
        }
        if (tm)
          ans.set(ob, tm);
      }

      // for (let j = 0; j < x.length; j++) {
      //     await User.findByIdAndUpdate(labs[x[i].ind]._id, labs[x[i].ind], { useFindAndModify: false })
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
    await ans.forEach(async (k, v) => {
      await fun.push({ data: v, count: k });
    })
    await res.status(200).json(fun);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.createLab = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).json({ message: "Content cannot be empty!" });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPwd = bcrypt.hashSync(req.body.password, salt);

  // new lab
  const newLab = new Lab({
    name: req.body.name,
    address: req.body.address,
    loginId: req.body.loginId,
    password: hashPwd,
    cntSample: {
      red: req.body.cntSample.red,
      yellow: req.body.cntSample.yellow,
      green: req.body.cntSample.green,
    },
    coordinate: {
      longitude: req.body.coordinate.longitude,
      latitude: req.body.coordinate.latitude,
    },
    capacity: req.body.capacity,
  });

  // save lab in the database
  newLab
    .save(newLab)
    .then((data) => {
      res
        .status(200)
        .json({ message: "New lab created successfully!", data });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.updateLab = async (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Content can not be empty!" });
    return;
  }

  try {
    const id = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const hashPwd = bcrypt.hashSync(req.body.password, salt);

    const lab = {
      name: req.body.name,
      address: req.body.address,
      loginId: req.body.loginId,
      password: hashPwd,
      cntSample: {
        red: req.body.cntSample.red,
        yellow: req.body.cntSample.yellow,
        green: req.body.cntSample.green,
      },
      coordinate: {
        longitude: req.body.coordinate.longitude,
        latitude: req.body.coordinate.latitude,
      },
      capacity: req.body.capacity,
    };

    await Lab.findByIdAndUpdate(id, lab, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot Update lab with id=${id}. Maybe lab was not found!`,
          });
        } else {
          res.status(200).json({ message: "Lab updated successfully!" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update lab information" });
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find();
    res.status(200).json(labs);
  } catch (err) {
    console.log(err);
  }
};
