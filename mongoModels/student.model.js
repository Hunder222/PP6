const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    KOEN: { type: String, required: true },
    Bopæl_POSTDISTRIKT: { type: String, required: true },
    Statsborgerskab: { type: String, required: true },
    INSTITUTIONSAKTIVITET: { type: Number, required: true },
    INSTITUTIONSAKT_BETEGNELSE: { type: String, required: true },
    KOT_OPTAGELSESOMRADENR: { type: Number, required: true },
    BETEGNELSE_A911: { type: String, required: true },
    OPTAG: { type: String, required: true },
    EKSAMENSTYPE_NAVN: { type: String, required: true },
    EKSAMENSAR: { type: Number, required: true },
    KVOTIENT: { type: Number, required: true },
    EKS_LAND_NAVN: { type: String, required: true },
    "Søgt som prioritet 1": { type: String, required: true },
    Alder: { type: Number, required: true },
    "Adgangsgivende skole navn": { type: String, required: true }
});


const Student = mongoose.model('student', studentSchema);
module.exports = Student;