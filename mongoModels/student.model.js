const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    Kon: { type: String, required: true },
    POSTDISTRIKT: { type: String, required: true },
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
    PRIORITY: { type: String, required: true },
    Alder: { type: Number, required: true },
    ADGANGSGIVENDESKOLENAVN: { type: String, required: true }
}, {
    timestamps: true
});


const Student = mongoose.model('Student', studentSchema);
module.exports = Student;