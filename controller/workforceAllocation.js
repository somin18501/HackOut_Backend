const { hospital } = require("../model/model");
const bcrypt = require("bcrypt");

// create and save new hospital

exports.createHosptal = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).json({ message: "Content cannot be empty!" });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPwd = bcrypt.hashSync(req.body.password, salt);

  // new hospital
  const newHospital = new hospital({
    name: req.body.name,
    address: req.body.address,
    loginId: req.body.loginId,
    password: hashPwd,
    count: {
      patient: req.body.count.patient,
      doctor: req.body.count.doctor,
      nurse: req.body.count.nurse,
    },
    coordinate: {
      longitude: req.body.coordinate.longitude,
      latitude: req.body.coordinate.latitude,
    },
    capacity: req.body.capacity,
  });

  // save hospital in the database
  newHospital
    .save(newHospital)
    .then((data) => {
      res
        .status(200)
        .json({ message: "New hospital created successfully!", data });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getHospitals = (req, res) => {
  hospital
    .find()
    .then((data) => {
      res
        .status(200)
        .json({ message: "Hospitals fetched successfully!", data });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

async function updateHospital(newHospital) {
  try {
    const updatedHospital = await hospital.findByIdAndUpdate(
      newHospital._id,
      newHospital,
      {
        new: true,
      }
    );
    // console.log(updatedHospital);
    return updatedHospital;
  } catch (err) {
    console.log(err);
    return null;
  }
}

exports.updateHospitals = (req, res) => {
  hospital
    .find()
    .then(async (data) => {
      let hospitals = data;

      let redHospitals = [];
      let blueHospitals = [];

      for (const hospital of hospitals) {
        const ptod = (1.0 * hospital.count.patient) / hospital.count.doctor;
        const pton = (1.0 * hospital.count.patient) / hospital.count.nurse;

        console.log("ptod: ", ptod);
        console.log("pton: ", pton);

        if (
          ptod > process.env.PATIENT_TO_DOCTOR ||
          pton > process.env.PATIENT_TO_NURSE
        ) {
          redHospitals.push(hospital);
        } else {
          blueHospitals.push(hospital);
        }
      }

      console.log("red hospitals: ", redHospitals);
      console.log("blue hospitals: ", blueHospitals);

      // Calculate the total surplus doctors and nurses in blueArray
      let surplusDoctors = 0;
      let surplusNurses = 0;

      for (const hospital of blueHospitals) {
        const doctorSurplus =
          hospital.count.doctor -
          Math.ceil(hospital.count.patient / process.env.PATIENT_TO_DOCTOR);
        const nurseSurplus =
          hospital.count.nurse -
          Math.ceil(hospital.count.patient / process.env.PATIENT_TO_NURSE);

        surplusDoctors += Math.max(doctorSurplus, 0);
        surplusNurses += Math.max(nurseSurplus, 0);
      }

      console.log("surplus doctors: ", surplusDoctors);
      console.log("surplus nurses: ", surplusNurses);

      for (const hospital of redHospitals) {
        const deficitDoctors =
          Math.ceil(hospital.count.patient / process.env.PATIENT_TO_DOCTOR) -
          hospital.count.doctor;
        const deficitNurses =
          Math.ceil(hospital.count.patient / process.env.PATIENT_TO_NURSE) -
          hospital.count.nurse;

        const doctorsToTransfer = Math.min(deficitDoctors, surplusDoctors);
        const nursesToTransfer = Math.min(deficitNurses, surplusNurses);

        hospital.count.doctor += doctorsToTransfer;
        hospital.count.nurse += nursesToTransfer;

        surplusDoctors -= doctorsToTransfer;
        surplusNurses -= nursesToTransfer;
      }

      hospitals = redHospitals.concat(blueHospitals);

      // redHospitals = [];
      // blueHospitals = [];

      // for (const hospital of hospitals) {
      //   const ptod = (1.0 * hospital.count.patient) / hospital.count.doctor;
      //   const pton = (1.0 * hospital.count.patient) / hospital.count.nurse;

      //   console.log("ptod: ", ptod);
      //   console.log("pton: ", pton);

      //   if (
      //     ptod > process.env.PATIENT_TO_DOCTOR ||
      //     pton > process.env.PATIENT_TO_NURSE
      //   ) {
      //     redHospitals.push(hospital);
      //   } else {
      //     blueHospitals.push(hospital);
      //   }
      // }

      // console.log("red hospitals: ", redHospitals);
      // console.log("blue hospitals: ", blueHospitals);

      // surplusDoctors = 0;
      // surplusNurses = 0;

      // for (const hospital of blueHospitals) {
      //   const doctorSurplus =
      //     hospital.count.doctor -
      //     Math.ceil(hospital.count.patient / process.env.PATIENT_TO_DOCTOR);
      //   const nurseSurplus =
      //     hospital.count.nurse -
      //     Math.ceil(hospital.count.patient / process.env.PATIENT_TO_NURSE);

      //   surplusDoctors += Math.max(doctorSurplus, 0);
      //   surplusNurses += Math.max(nurseSurplus, 0);
      // }

      // console.log("surplus doctors: ", surplusDoctors);
      // console.log("surplus nurses: ", surplusNurses);
      
      // code to update hospitals in database

      // let updatedHospitals = [];
      // for (const hospital of hospitals) {
      //   const updatedHospital = await updateHospital(hospital);
      //   if (updatedHospital) {
      //     updatedHospitals.push(updatedHospital);
      //   }
      // }

      res
        .status(200)
        .json({ message: "Hospitals updated successfully!", hospitals });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
