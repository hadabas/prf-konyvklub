import mongoose, { Document, Model, Schema } from 'mongoose';

interface IRangsor extends Document {
    ev: number;
    honap: number;
    honap_konyve: string;
    elsohelyezett: string;
    masodikhelyezett: string;
    harmadikhelyezett: string;
}

const RangsorSchema: Schema<IRangsor> = new mongoose.Schema({
    ev: { type: Number, required: true },
    honap: { type: Number, required: true },
    honap_konyve: { type: String, required: true },
    elsohelyezett: { type: String, default: '' },
    masodikhelyezett: { type: String, default: '' },
    harmadikhelyezett: { type: String,  default: '' }
});

RangsorSchema.index({ ev: 1, honap: 1 }, { unique: true });

export const Rangsor: Model<IRangsor> = mongoose.model<IRangsor>('Rangsor_entry', RangsorSchema, 'Rangsor'); // Az első a név, második a séma, harmadik a kollekciónak a neve, ahová mentődik.