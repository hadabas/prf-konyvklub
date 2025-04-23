import mongoose, { Document, Model, Schema } from 'mongoose';

interface IClub extends Document {
    owner: string,
    klubnev: string;
    picture_path: string;
    description: string;
    recommended_books: string[];
    members: string[];
}

const ClubSchema: Schema<IClub> = new mongoose.Schema({
    owner: { type: String, required: true , default: 'admin'}, 
    klubnev: { type: String, required: true },
    picture_path: { type: String, required: true },
    description: { type: String, required: true },
    recommended_books: {type: [JSON], required: true, default: []},
    members: {type: [String], required: true, default: []}
});

export const Club: Model<IClub> = mongoose.model<IClub>('Club', ClubSchema, 'Clubs'); //Az első a név, második a séma, harmadik a kollekciónak a neve, ahová mentődik.